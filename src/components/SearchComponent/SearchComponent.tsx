import React, { useEffect, useState } from 'react';

const SearchComponent: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://splunk.hctint.com:9876/data/create_search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        list: ['VERA VERA MARIA ALEJANDRA'],
                        source: 'noticias',
                        key: 'valid_api_key'
                    }),

                });

                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData); // Imprimir la respuesta en la consola
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SearchComponent;
