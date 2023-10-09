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
  const [estado, setEstado] = useState(-2); // Agrega la variable severifico
  

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
        const foundUser = data.data.find((obj: { attributes: { email: string; }; }) => obj.attributes.email === user.email);
        console.log("urlSearchParams")
        if (user && user.sub && user.sub.includes("auth0")) {
          // Realiza la acción cuando user.sub contiene "auth0"
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

            const urlSearchParams = new URLSearchParams(window.location.search);
            const codigo = urlSearchParams.get('codigo');
            
            if(foundUser.attributes.auth0 == false){
              if(codigo && foundUser.attributes.codigo_de_verificacion == codigo){
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
                    //se verifico la cuenta
                    setEstado(1);
                  }else{
                    throw new Error(`Failed to create user, ${postResponse.status}`);
                  }
                } catch (error) {
                  console.log(error);
                }
              }else{
                setEstado(-1);
              }
            }else{
              setEstado(0);
            }
          }
        }else{
           // Redirige al usuario a la página de inicio ("/")
           //window.location.href = "/";
           setEstado(0);
        }
      }else{
        setEstado(2);
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
      {(estado === -1) && ( // Renderiza el contenido si ingresa a la pagina sin el codigo o el ocidgo incorrecto y sin estar verificado
        <div className='verificar-correo-contenido'>
          <h1 className="verificar-correo-titulo">Revisa tu correo para verificar tu cuenta</h1>
          <Link href={"/"}><button className="hero-button">Volver al inicio</button></Link>
        </div>
      )}
      {(estado === 0) && ( // Renderiza el contenido si ingresa a la pagina estando verificado
        <div className='verificar-correo-contenido'>
          <h1 className="verificar-correo-titulo">Tu cuenta ya esta verificada</h1>
          <Link href={"/"}><button className="hero-button">Volver al inicio</button></Link>
        </div>
      )}
      {(estado === 1) && ( // Renderiza el contenido si ingresa a la pagina con el codigo y sin estar verificado
        <div className='verificar-correo-contenido'>
          <h1 className="verificar-correo-titulo">Tu correo se a verificado correctamente</h1>
          <Link href={"/planes"}><button className="hero-button">Ver planes</button></Link>
        </div>
      )}
      {(estado === 2) && ( // Renderiza el contenido si ingresa a la pagina y no esta logueado
        <div className='verificar-correo-contenido'>
          <h1 className="verificar-correo-titulo">Ingresa con tu cuenta para continuar la verificacion de tu correo</h1>
          <Link href={"/api/auth/login"}><button className="hero-button">Ingresar</button></Link>
        </div>
      )}
    </UserProvider>
  );
};

export default VerificarCorreo;

