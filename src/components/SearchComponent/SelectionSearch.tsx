"use client"
import React, { useEffect, useState } from 'react';
import './SelectionSearch.css';
import Multisearch from './Multisearch';
import SearchComponent from './SearchComponent';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import SeccionCreaTuCuenta from '../Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta';

function SelectionSearch() {
    const [isSimpleSearch, setIsSimpleSearch] = useState(true);
    const [isBatchSearch, setIsBatchSearch] = useState(false);
    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userCredits, setUserCredits] = useState()

    const handleSimpleSearchClick = () => {
        setIsSimpleSearch(true);
        setIsBatchSearch(false);
    };

    const handleBatchSearchClick = () => {
        setIsSimpleSearch(false);
        setIsBatchSearch(true);
    };

    useEffect(() => {
        getuser()
            .then((foundUser) => {
                if (foundUser) {
                    const userCredits = foundUser.attributes.creditos;
                    setUserCredits(userCredits)
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });

    }, [user]);

    async function getuser() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users?populate=*&filters[email][$eq]=${userEmail}`, {

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
            const foundUser = data.data.find((obj: { attributes: { email: string | null | undefined; }; }) => obj.attributes.email === userEmail);

            console.log("founduser", foundUser)
            return foundUser;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }

    return (
        <div className="switch-container">
            <div>
                <button
                    className={`search-button ${isSimpleSearch ? 'active' : ''}`}
                    onClick={handleSimpleSearchClick}
                >
                    Búsqueda Simple
                </button>
                <button
                    className={`search-button ${isBatchSearch ? 'active' : ''}`}
                    onClick={handleBatchSearchClick}
                >
                    Búsqueda por Lote
                </button>
            </div>
            <div className="content">
                {isSimpleSearch ? <SearchComponent /> : null}
                {isBatchSearch ? (userCredits != null ? <Multisearch /> : <SeccionCreaTuCuenta />) : null}
            </div>
            <br></br>
        </div>
    );
}

export default SelectionSearch;
