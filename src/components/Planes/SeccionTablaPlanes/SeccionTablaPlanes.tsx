"use client";
import React, { useState, useEffect } from 'react';
import './SeccionTablaPlanes.css';
interface TablaPlan {
    key: any;
}
function SeccionTablaPlanes() {
    const [plans, setPlans] = useState<TablaPlan[]>([]);
    useEffect(() => {
        getTablaPlanes().then((foundPlans) => {
            setPlans(foundPlans)
        })
    },[])
    async function getTablaPlanes() {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/tabla-plane`,
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
            return data.data.attributes.json;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }
  return (
    <><section className='seccion-tabla-planes'>
        <div>
            <table>
                <tbody>
                {plans.map((row, index) => (
                    <tr key={index} className={index === 0 ? "header" : ""}>
                        {Object.values(row).map((value, colIndex) => (
                        colIndex === 0 ?  (
                            <th key={colIndex}>{value}</th>
                        ) : (
                            <td key={colIndex}>{value}</td>
                        )
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </section></>
  );
}

export default SeccionTablaPlanes;
