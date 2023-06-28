import * as React from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

function Login() {
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
            // Buscar el correo electrónico en el array de objetos
            const userEmail = user.email;
            const foundUser = data.data.find((obj: { attributes: { email: string | null | undefined; }; }) => obj.attributes.email === userEmail);

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
                                email: userEmail,
                                username: user.name,
                              },
                        }
                        ),
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
        <>
            {!user && (
                <div>
                    <a href="/api/auth/login">Login</a>
                </div>
            )}
            {user && (
                <div>
                    <img src={user.picture || ''} alt={user.name || ''} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <a href="/api/auth/logout">Logout</a>
                </div>
            )}
        </>
    );
}

export default Login;