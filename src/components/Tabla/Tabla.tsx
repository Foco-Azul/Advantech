"use client";
import React, { useState, useEffect } from 'react';
import './Tabla.css';

function Tabla() {
    const [priceTiers, setPriceTiers] = useState<any[]>([]);

    useEffect(() => {
        // Lógica para obtener los datos de la API y establecer los price tiers
        planalacarta().then((data) => {
            setPriceTiers(data);
        });
    }, []);

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
                               <td className="tabla-text">{`${tier.attributes.minimo.toLocaleString()} - ${tier.attributes.maximo.toLocaleString()}`}</td>
                            <td className="tabla-text">{`$${tier.attributes.preciocredito.toFixed(2)}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
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
