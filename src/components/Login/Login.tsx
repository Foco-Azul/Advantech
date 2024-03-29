import * as React from "react";
import { useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import './Login.css'; // Reemplaza "Login.css" con el nombre de tu archivo CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTie, faChevronDown, faChevronUp, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import crypto from 'crypto';
import Loading from "@/components/Loading/Loading";

interface LoginProps {
  loginname: string;
}

function generateApiKey(email: string): string {
  const secret = 'tu_secreto'; // Debes reemplazar 'tu_secreto' por una cadena secreta segura
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(email);
  const apiKey = hmac.digest('hex');
  return apiKey;
}

function Login({ loginname }: LoginProps) {
  const { user, error, isLoading } = useUser();
  const [showSubPerfil, setShowSubPerfil] = useState(false); // Nuevo estado para controlar la visibilidad
  const [isPerfilOpen, setPerfilOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(true);
  const toggleRecursos = () => {
    setPerfilOpen(!isPerfilOpen);
  };
   // Función para crear y añadir el elemento al body
   const crearElemento = () => {
    const nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = `
      <section class='precarga'>
        <div class='animacion'>
          <img src="/image/logo-advantech-datos.svg" alt="Company Logo" width="164" height="133"/>
        </div>
      </section>
    `;
    nuevoElemento.id = 'procesando'; // Puedes agregar un ID para referenciarlo posteriormente
    document.body.appendChild(nuevoElemento);
  };

  // Función para remover el elemento del body
  const removerElemento = () => {
    const elementoExistente = document.getElementById('procesando');
    if (elementoExistente) {
      document.body.removeChild(elementoExistente);
    }
  };

  React.useEffect(() => {
    if (user) {
      getusers();
    }
  }, [user]);
  async function getusers() {
    // Verificar si user es undefined antes de continuar
    if (!user) {
      removerElemento();
      return;
    }
    try {
      crearElemento()
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
      const fechaHoraActual = new Date().toISOString();
      const codigoAleatorio = Math.random().toString(36).substring(2, 8);
      const codigoUnico = fechaHoraActual.replace(/[^a-zA-Z0-9]/g, '') + codigoAleatorio;
      if (foundUser) {
        setUserName(foundUser.attributes.username);
        if (user && user.sub && user.sub.includes("auth0") && foundUser.attributes.auth0 == null) {
          // Realizar el POST con los datos requeridos
         const postResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${foundUser.id}`,
           {
             method: "PUT",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               data: {
                 codigo_de_verificacion: codigoUnico,
                 auth0: false,
                 estaactivo: true,
               },
             }),
             cache: "no-store",
           }
         );
         
         if (postResponse.status === 200) {
         } else {
           throw new Error(`Failed to create user, ${postResponse.status}`);
         }
        }
        if (user && user.sub && user.sub.includes("google") && foundUser.attributes.google==null) {
        // Realizar el POST con los datos requeridos
        const postResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${foundUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                google: true,
                estaactivo: true,
              },
            }),
            cache: "no-store",
          }
        );
        
        if (postResponse.status === 200) {
        } else {
          throw new Error(`Failed to create user, ${postResponse.status}`);
        }
        }
        if (user && user.sub && user.sub.includes("windowslive") && foundUser.attributes.microsoft==null) {
          // Realizar el POST con los datos requeridos
          const postResponse = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${foundUser.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  microsoft: true,
                  estaactivo: true,
                },
              }),
              cache: "no-store",
            }
          );
          
          if (postResponse.status === 200) {
          } else {
            throw new Error(`Failed to create user, ${postResponse.status}`);
          }
        }
      } else {
        setUserName((user.email ? user.email.toString() : "").split("@")[0]);
          const credito_gratuito = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/credito-gratuito?populate=*`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
              },
              cache: "no-store",
            }
          );
          if (credito_gratuito.status !== 200) {
            throw new Error(`Failed to fetch data, ${credito_gratuito.status}`);
          }
          const credito_gratuito_data = (await credito_gratuito.json()).data.attributes;
          var fechaActual = new Date();
          fechaActual.setMonth(fechaActual.getMonth() + credito_gratuito_data.meses);
          var fechaVencimiento = fechaActual.toISOString();
          
          if (typeof user.email === 'string') {
            var data_post_user;
            if (user && user.sub && user.sub.includes("auth0")) {
              // Realizar el POST con los datos requeridos
              var body_data;
              if (credito_gratuito_data.activo) {
                body_data = JSON.stringify({
                  data : {
                    email: user.email,
                    username: user.email?.split("@")[0],
                    vencimiento: fechaVencimiento,
                    plan: credito_gratuito_data.id_plan.data.id,
                    creditos: credito_gratuito_data.creditos,
                    codigo_de_verificacion: codigoUnico,
                    apikey: generateApiKey(user.email),
                    auth0: false,
                    estaactivo: true,
                  }
                });
              } else {
                body_data = JSON.stringify({
                  data : {
                    email: user.email,
                    username: user.email?.split("@")[0],
                    vencimiento: "2023-01-01",
                    codigo_de_verificacion: codigoUnico,
                    apikey: generateApiKey(user.email),
                    auth0: false,
                    estaactivo: true,
                  }
                });
              }
              const postResponse = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: body_data,
                  cache: "no-store",
                }
              );
              
              if (postResponse.status === 200) {
                data_post_user = await postResponse.json()
              } else {
                throw new Error(`Failed to create user, ${postResponse.status}`);
              }
            }else{
              if (user && user.sub && user.sub.includes("google")) {
                // Realizar el POST con los datos requeridos
                var body_data;
                if (credito_gratuito_data.activo) {
                  body_data = JSON.stringify({
                    data : {
                      email: user.email,
                      username: user.email?.split("@")[0],
                      vencimiento: fechaVencimiento,
                      plan: credito_gratuito_data.id_plan.data.id,
                      creditos: credito_gratuito_data.creditos,
                      apikey:  generateApiKey(user.email),
                      google: true,
                      estaactivo: true
                    }
                  });
                } else {
                  body_data = JSON.stringify({
                    data : {
                      email: user.email,
                      username: user.email?.split("@")[0],
                      vencimiento: "2023-01-01",
                      apikey:  generateApiKey(user.email),
                      google: true,
                      estaactivo: true
                    }
                  });
                }
                const postResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: body_data,
                    cache: "no-store",
                  }
                );

                if (postResponse.status === 200) {
                  data_post_user = await postResponse.json()
                } else {
                  throw new Error(`Failed to create user, ${postResponse.status}`);
                }
              }else{
                if (user && user.sub && user.sub.includes("windowslive")) {
                  // Realizar el POST con los datos requeridos
                  var body_data;
                  if (credito_gratuito_data.activo) {
                    body_data = JSON.stringify({
                      data : {
                        email: user.email,
                        username: user.email?.split("@")[0],
                        vencimiento: fechaVencimiento,
                        plan: credito_gratuito_data.id_plan.data.id,
                        creditos: credito_gratuito_data.creditos,
                        apikey:  generateApiKey(user.email),
                        microsoft: true,
                        estaactivo: true
                      }
                    });
                  } else {
                    body_data = JSON.stringify({
                      data : {
                        email: user.email,
                        username: user.email?.split("@")[0],
                        vencimiento: "2023-01-01",
                        apikey:  generateApiKey(user.email),
                        microsoft: true,
                        estaactivo: true
                      }
                    });
                  }
                const postResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: body_data,
                    cache: "no-store",
                  }
                );

                if (postResponse.status === 200) {
                  data_post_user = await postResponse.json()
                } else {
                  throw new Error(`Failed to create user, ${postResponse.status}`);
                }
              }
              }
            }
            if(data_post_user && data_post_user.data.id){
              const posthistorial = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    data: {
                      auth_0_user: data_post_user.data.id,
                      creditos: credito_gratuito_data.creditos,
                      fecha: new Date(),
                      precio: 0,
                      plane: credito_gratuito_data.id_plan.data.id,
                      consulta: "Regalo de bienvenida",
                      tipo: "bienvenida",
                      factura: {
                        email: user.email,
                        emitir: false
                      },  
                    },
                  }
                  ),
                  cache: "no-store",
                }
              );
            }
          }
      }
      removerElemento();
    } catch (error) {
      console.error(`Failed to fetch data, ${error}`);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
    <div className="login-container">
      {user && (
        <div>
          <div className="login-container-pc"
            onMouseEnter={() => setShowSubPerfil(true)} // Mostrar sub_recursos cuando el mouse está sobre "Recursos"
            onMouseLeave={() => setShowSubPerfil(false)} // Ocultar sub_recursos cuando el mouse sale de "Recursos"
          >
            <a className="login-name"><FontAwesomeIcon icon={faUserTie} size="xl" /> &nbsp; {userName} &nbsp; <FontAwesomeIcon icon={showSubPerfil ? faChevronUp : faChevronDown} /></a> {/* Mostrar la parte del correo antes del símbolo "@" si está definida */}
            <div className={`navigation-sub_menu-trigger  ${showSubPerfil ? "visible" : ""} `}>
              <ul>
                <li className="sub-menu"><a href={`${process.env.NEXT_PUBLIC_ADVANTECH_API_CLIENTE_URL}:${process.env.NEXT_PUBLIC_ADVANTECH_API_CLIENTE_PUERTO}/docs/`} target="_blank">Documentación API</a></li>
                <li><a href="/micuenta" >Mi cuenta</a></li>
                <li><a href="/micuenta/?ver=busquedas" >Historial de busquedas</a></li>
                <li><a href="/micuenta/?ver=compras" >Historial de pagos</a></li>
                <li><a href="/micuenta/?ver=soporte" >Soporte</a></li>
                <li><a href="/api/auth/logout" >Salir</a></li>
              </ul>
            </div>
            {/*
            <button
              className="logout-button"
              onClick={() => {
                window.location.href = "/api/auth/logout";
              }}
            >
              LOGOUT
            </button>
            */}
          </div>
          <div className="login-container-movil"
            onMouseEnter={() => setShowSubPerfil(true)} // Mostrar sub_recursos cuando el mouse está sobre "Recursos"
            onMouseLeave={() => setShowSubPerfil(false)} // Ocultar sub_recursos cuando el mouse sale de "Recursos"
          >
            <div className="popup-menu-title"><a onClick={toggleRecursos}>{user.email?.split("@")[0]} <span><FontAwesomeIcon icon={isPerfilOpen ? faChevronDown : faChevronRight} size="xl" /></span> </a> {/* Mostrar la parte del correo antes del símbolo "@" si está definida */}
              {isPerfilOpen && (
                <div>
                  <ul>
                    <li className="sub-menu"><a href={`${process.env.NEXT_PUBLIC_ADVANTECH_API_CLIENTE_URL}:${process.env.NEXT_PUBLIC_ADVANTECH_API_CLIENTE_PUERTO}/docs/`} target="_blank">Documentación API</a></li>
                    <li className="sub-menu"><Link href="/micuenta" legacyBehavior passHref>Mi cuenta</Link></li>
                    <li className="sub-menu"><Link href="/micuenta/?ver=busquedas" legacyBehavior passHref>Historial de busquedas</Link></li>
                    <li className="sub-menu"><Link href="/micuenta/?ver=compras" legacyBehavior passHref>Historial de pagos</Link></li>
                    <li className="sub-menu"><Link href="/micuenta/?ver=soporte" legacyBehavior passHref>Soporte</Link></li>
                  </ul>
                </div>
              )}
            </div>
            <a className="logout-button" href="/api/auth/logout" >Salir</a>
            {/*
            <button
              className="logout-button"
              onClick={() => {
                window.location.href = "/api/auth/logout";
              }}
            >
              LOGOUT
            </button>
            */}
          </div>
        </div>
      )}
      {!user && (
        <div>
          <a href="/api/auth/login"><button className="logout-button" ><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} /> {loginname}
          </button></a>
        </div>
      )}
    </div>
    </>
    );
}

export default Login;
