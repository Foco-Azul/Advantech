import * as React from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import './Login.css'; // Reemplaza "Login.css" con el nombre de tu archivo CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
  loginname: string;
}

function Login({ loginname }: LoginProps) {
  const { user, error, isLoading } = useUser();

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
        <div className="login-container">
          <p className="login-name">{user.email?.split("@")[0]}</p> {/* Mostrar la parte del correo antes del símbolo "@" si está definida */}
          <button
            className="logout-button"
            onClick={() => {
              window.location.href = "/api/auth/logout";
            }}
          >
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div>
          <button
            className="logout-button"
            onClick={() => {
              window.location.href = "/api/auth/login";
            }}
          >
            <FontAwesomeIcon icon={faUser} style={{ color: "#009fde", }} /> {loginname}
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
