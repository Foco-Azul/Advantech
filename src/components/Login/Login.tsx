import * as React from "react";
import { useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import './Login.css'; // Reemplaza "Login.css" con el nombre de tu archivo CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTie, faChevronDown, faChevronUp, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface LoginProps {
  loginname: string;
}

function Login({ loginname }: LoginProps) {
  const { user, error, isLoading } = useUser();
  const [showSubPerfil, setShowSubPerfil] = useState(false); // Nuevo estado para controlar la visibilidad
  const [isPerfilOpen, setPerfilOpen] = useState(false);

  const toggleRecursos = () => {
    setPerfilOpen(!isPerfilOpen);
  };

  React.useEffect(() => {
    if (user) {
      getusers();
    }
  }, [user]);

  async function getusers() {
    // Verificar si user es undefined antes de continuar
    if (!user) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users`,
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

      if (foundUser) {
        console.log("El correo electrónico existe en el array de objetos.");
        // Aquí puedes hacer algo con el usuario encontrado
        console.log(foundUser);
      } else {
        console.log("El correo electrónico no existe en el array de objetos.");

        // Realizar el POST con los datos requeridos
        const postResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                email: user.email,
                username: user.name,
                vencimiento: "2023-01-01",
                plan: 4
              },
            }),
            cache: "no-store",
          }
        );

        if (postResponse.status === 200) {
          console.log("Usuario creado con éxito.");
        } else {
          console.log(postResponse.status);
          throw new Error(`Failed to create user, ${postResponse.status}`);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch data, ${error}`);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="login-container">
      {user && (
        <div>
          <div className="login-container-pc" 
            onMouseEnter={() => setShowSubPerfil(true)} // Mostrar sub_recursos cuando el mouse está sobre "Recursos"
            onMouseLeave={() => setShowSubPerfil(false)} // Ocultar sub_recursos cuando el mouse sale de "Recursos"
          >
            <a className="login-name"><FontAwesomeIcon icon={faUserTie} size="xl" /> &nbsp; {user.email?.split("@")[0]} &nbsp; <FontAwesomeIcon icon={showSubPerfil ? faChevronUp : faChevronDown}/></a> {/* Mostrar la parte del correo antes del símbolo "@" si está definida */}
            <div className={`navigation-sub_menu-trigger  ${showSubPerfil ? "visible" : ""} `}>
              <ul>
                <li><Link href="/mi-cuenta" legacyBehavior passHref>Mi cuenta</Link></li>
                <li><Link href="/mi-cuenta" legacyBehavior passHref>Mis datos</Link></li>
                <li><Link href="/mi-cuenta" legacyBehavior passHref>Historial de pagos</Link></li>
                <li onClick={() => {window.location.href = "/api/auth/logout";}}>Salir</li>
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
            <div className="popup-menu-title"><a onClick={toggleRecursos}>{user.email?.split("@")[0]} <span><FontAwesomeIcon icon={isPerfilOpen ? faChevronDown : faChevronRight} size="xl"/></span> </a> {/* Mostrar la parte del correo antes del símbolo "@" si está definida */}
            {isPerfilOpen && (
              <div>
                <ul>
                  <li className="sub-menu"><Link href="/mi-cuenta" legacyBehavior passHref>Mi cuenta</Link></li>
                  <li className="sub-menu"><Link href="/mi-cuenta" legacyBehavior passHref>Mis datos</Link></li>
                  <li className="sub-menu"><Link href="/mi-cuenta" legacyBehavior passHref>Historial de pagos</Link></li>
                </ul>
              </div>
            )}
            </div>
            <button
              className="logout-button"
              onClick={() => {
                window.location.href = "/api/auth/logout";
              }}
            >
              SALIR
            </button>
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
          <a className="logout-button" href = "/api/auth/login"><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} /> {loginname}
          </a>
        </div>
      )}
    </div>
  );
}

export default Login;
