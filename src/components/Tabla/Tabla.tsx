"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import './Tabla.css';

interface Plan {
    id: number;
    attributes: {
        lan: string;
        Buscador: boolean;
        Precio: number;
        API: boolean;
        Creditos: number;
        Vencimiento: number;
        XLSX: boolean;
        CSV: boolean;
        TXT: boolean;
        PDF: boolean;
        Soporte: boolean;
    };
}

function Tabla() {
    const [priceTiers, setPriceTiers] = useState<any[]>([]);
    const { user, error, isLoading } = useUser();
    const [plan, setPlan] = useState<Plan | null>(null);
    const [planValido, setPlanValido] = useState<boolean>(false);

    useEffect(() => {
        // Lógica para obtener los datos de la API y establecer los price tiers
        if (!user) {
            planalacarta().then((data) => {
                setPriceTiers(data);
            });
            setPlanValido(false);
        } else {
            getusers().then((foundUser) => {
                if (foundUser && foundUser.attributes.vencimiento && foundUser.attributes.plan.data.id) {
                    const vencimiento = new Date(foundUser.attributes.vencimiento);
                    if (vencimiento > new Date() && foundUser.attributes.plan.data.id != 4) {
                        setPlanValido(true);
                        getPlan(foundUser.attributes.plan.data.id).then((foundPlan) => {
                            if (foundPlan) {
                                setPlan(foundPlan)
                            }
                        })
                    } else {
                        setPlanValido(false);
                        planalacarta().then((data) => {
                            setPriceTiers(data);
                        });
                    }
                } else {
                    setPlanValido(false);
                    planalacarta().then((data) => {
                        setPriceTiers(data);
                    });
                }
            })
        }
    }, [user]);

    async function getusers() {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users?filters[email][$eq]=${user?.email}&populate=*`,
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
            const foundUser = data.data.find((obj: { attributes: { email: string; }; }) => obj.attributes.email === user?.email);
            return foundUser;
        } catch (e) {

        }
    }
    async function getPlan(id: number) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/planes/${id}`,
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
            const foundPlan = await response.json();
            return foundPlan.data;
        } catch (e) {

        }
    }
    if (!planValido) {
        return (
            <div className="tabla-container">
                <h3 className="tabla-title-h3">Rangos de precio</h3>
                <table className="tabla-card">
                    <thead className="tabla-head">
                        <tr>
                            <th className="tabla-title-i">Rango de créditos</th>
                            <th className="tabla-title-d">Costo por crédito</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceTiers.map((tier, index) => (
                            <tr key={index} className={index % 2 === 0 ? '' : 'tabla-tr'}>
                                <td className="tabla-text">{`${tier.attributes.minimo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} - ${tier.attributes.maximo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</td>
                                <td className="tabla-text">{`$${tier.attributes.preciocredito.toFixed(2)}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        //RETORNARA ESTO CUANDO EL USUARIO TENGA UN PLAN DIFERENTE AL PERSONALIZADO
        return (
            <div className="tabla-container">
                <h3 className="tabla-title-h3">Por ser parte de Advantech</h3>
                <h3 className="tabla-title-h3">Tenemos un precio especial para ti</h3>
                {/* <table className="tabla-card">
                    <thead className="tabla-head">
                        <tr>
                            <th className="tabla-title-i">Rango de créditos</th>
                            <th className="tabla-title-d">Costo por crédito</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='tabla-tr'>
                            <td className="tabla-text">{`${plan && plan.attributes ? Math.round(3 / (plan.attributes.Precio / plan.attributes.Creditos)) : ''} - ${plan && plan.attributes ? Number(plan.attributes.Creditos).toLocaleString('es-ES') : ''}`}</td>

                            <td className="tabla-text">{`$ ${plan && plan.attributes ? Number(plan.attributes.Precio / plan.attributes.Creditos).toLocaleString('es-ES') : ''}`}</td>
                        </tr>
                    </tbody>
                </table> */}

                <div className='micuenta-datos-card username'>
                    <span className='micuenta-datos-title'>Costo por crédito</span>
                    <span className='micuenta-datos-subtitle username'>   {`$ ${plan && plan.attributes ? Number(plan.attributes.Precio / plan.attributes.Creditos).toLocaleString('es-ES') : ''}`}</span>
                    <span className='micuenta-datos-title'>Rango de compra</span>
                    <span className='micuenta-datos-subtitle username'>  {`${plan && plan.attributes ? Math.round(3 / (plan.attributes.Precio / plan.attributes.Creditos)) : ''} - ${plan && plan.attributes ? Number(plan.attributes.Creditos).toLocaleString('es-ES') : ''}`}</span>
                </div>
            </div>
        );
    }

}

async function planalacarta() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/plan-a-la-cartas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
            },
            cache: 'no-store',
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch data, ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        throw new Error(`Failed to fetch data, ${error}`);
    }
}

export default Tabla;
