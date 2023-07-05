"use client"
import React, { useState, useEffect } from 'react';

const Carousel: React.FC = () => {
    const phrases = [
        '1Lorem ipsum dolor sit amet.',
        '2Consectetur adipiscing elit.',
        '3Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        '4Ut enim ad minim veniam.',
        '5Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '6Lorem ipsum dolor sit amet.',
        '7Consectetur adipiscing elit.',
        '8Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        '9Ut enim ad minim veniam.',
        '10Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ];

    const [currentPhrase, setCurrentPhrase] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPhrase((prevPhrase) => (prevPhrase === phrases.length - 3 ? 0 : prevPhrase + 1));
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [phrases.length]);

    const nextPhrase = () => {
        setCurrentPhrase((prevPhrase) => (prevPhrase === phrases.length - 3 ? 0 : prevPhrase + 1));
    };

    const prevPhrase = () => {
        setCurrentPhrase((prevPhrase) => (prevPhrase === 0 ? phrases.length - 3 : prevPhrase - 1));
    };

    const renderedPhrases = phrases.slice(currentPhrase, currentPhrase + 3);

    return (
        <div className="carousel">
            <button className="carousel-button" onClick={prevPhrase}>
                Prev
            </button>
            {renderedPhrases.map((phrase, index) => (
                <h2 key={index} className="carousel-title">{phrase}</h2>
            ))}
            <button className="carousel-button" onClick={nextPhrase}>
                Next
            </button>
        </div>
    );
};

export default Carousel;
