'use client';
import React, { useEffect, useState } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import "./VerificarCorreo.css";
import { useUrl } from 'nextjs-current-url';
import Link from 'next/link';

const VerificarCorreo: React.FC = () => {
  const { user } = useUser();
  const userEmail = user?.email;
  const { href: currentUrl, pathname } = useUrl() ?? {};

  const [userPlanData, setUserPlanData] = useState<number | null>(null);
  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [planId, setPlanId] = useState<number | null>(null);
  const [creditosFuente, setCreditosFuente] = useState<any[]>([]);
  const [severifico, setSeverifico] = useState(false); // Agrega la variable severifico

  async function searchUser() {
    try {
      if(user){
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users?filters[email][$eq]=${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
            },
            cache: "no-store",
          }
        );
        if (response.status !== 200) {
          throw new Error(`Failed to fetch data, ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const foundUser = data.data.find((obj: { attributes: { email: string; }; }) => obj.attributes.email === user.email);
        if (user && user.sub && user.sub.includes("auth0")) {
          // Realiza la acción cuando user.sub contiene "auth0"
          console.log("El valor de user.sub contiene 'auth0'.");
          // Agrega aquí tu código adicional
          if (foundUser ) {
            // Haz algo con el usuario encontrado
            const userPlanData = foundUser.attributes.plan?.data.attributes.Precio;
            const userCredits = foundUser.attributes.creditos;
            const userVencimiento = foundUser.attributes.vencimiento;
            const userId = foundUser.id;
            const planId = foundUser.attributes.plan?.data.id;
    
            setUserPlanData(userPlanData);
            setUserCredits(userCredits);
            setUserVencimiento(userVencimiento);
            setUserId(userId);
            setPlanId(planId);
    
            console.log('Usuario encontrado:', foundUser);
            console.log('Usuario auth0:', user);
            console.log(currentUrl);
            console.log("codigo2: ", foundUser.attributes.codigo_de_verificacion);
            console.log("estado auth0: ", foundUser.attributes.auth0);
            const urlSearchParams = new URLSearchParams(window.location.search);
            const codigo = urlSearchParams.get('codigo');
            if(codigo && foundUser.attributes.codigo_de_verificacion == codigo && foundUser.attributes.auth0 == null){
              console.log("codigo1: ", codigo);
              console.log("codigo2: ", foundUser.attributes.codigo_de_verificacion);
              try {
                const postResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${userId}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data: {
                        auth0: true
                      },
                    }
                    ),
                    cache: "no-store",
                  }
                );
                if (postResponse.status === 200) {
                  setSeverifico(true);
                }else{
                  console.log(postResponse.status);
                  throw new Error(`Failed to create user, ${postResponse.status}`);
                }
              } catch (error) {
                console.log(error);
              }
            }else{
               // Redirige al usuario a la página de inicio ("/")
               window.location.href = "/";
            }

          } else {
            console.log('Usuario no encontrado');
             // Redirige al usuario a la página de inicio ("/")
             window.location.href = "/";
          }
        }else{
           // Redirige al usuario a la página de inicio ("/")
           window.location.href = "/";
        }
      } 
    }catch (error) {
      console.error(`Failed to fetch data, ${error}`);
    }
  }
  useEffect(() => {
    searchUser();
  }, [user]);

  return (
    <UserProvider>
      {severifico && ( // Renderiza el contenido si severifico es true
        <div className='verificar-correo-contenido'>
          <h1 className="verificar-correo-titulo">Tu correo se a verificado correctamente</h1>
          <Link href={"/"}><button className="hero-button">Volver al inicio</button></Link>
        </div>
      )}
    </UserProvider>
  );
};

export default VerificarCorreo;

