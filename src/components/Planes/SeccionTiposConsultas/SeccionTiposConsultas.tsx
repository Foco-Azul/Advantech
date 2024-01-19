'use client'
import './SeccionTiposConsultas.css';
import React, { useEffect, useState } from 'react';

function SeccionTiposConsultas() {
    const [CreditosFuentes, setCreditosFuente] = useState<any[]>([]);

    useEffect(() => {
        creditosfuentes()
    },[]);
    async function creditosfuentes() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/creditos-fuentes`, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
                },
                cache: "no-store",
            });
            if (response.status !== 200) {
                throw new Error(`Failed to fetch data, ${response.status}`);
            }
            const data = await response.json();
            setCreditosFuente(data.data)
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }
  return (
    <section className='seccion-Tipos-Consultas' id='fuentes'>
        <div>
            <div className="tipos-consultas-head-container">
                <h2 className="tipos-consultas-head-title">Tipos de consultas</h2>
                <h3 className="tipos-consultas-head-subtitle">Conoce nuestra relación de consultas créditos - fuente</h3>
                <p className="tipos-consultas-head-text">En esta tabla podrás encontrar los tipos de consultas, la fuente de obtención de datos y los créditos que requieren.</p>
            </div>

            <div className='contenedor-tabla'>
                <table>
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Consultas</th>
                            <th>Fuente</th>
                            <th>Descripción</th>
                            <th>Créditos</th>
                        </tr>
                    </thead>

                    <tbody>
                        {CreditosFuentes.map((creditoFuente) => (
                            <tr key={creditoFuente.id}>
                                <td>{creditoFuente.attributes.estaactivo ? "Activa" : "Proximamente"}</td>
                                <td>{creditoFuente.attributes.consulta}</td>
                                <td>{creditoFuente.attributes.fuente_long}</td>
                                <td>{creditoFuente.attributes.descripcion}</td>
                                <td>{creditoFuente.attributes.credito}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  );
}

export default SeccionTiposConsultas;
