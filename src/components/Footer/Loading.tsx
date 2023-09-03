'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from "./image/logo-advantech-datos.svg"
import './Loading.css';

function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`precarga ${isVisible ? '' : 'hidden'}`}>
      <div className='animacion'>
        <Image src={Logo} alt="Company Logo" width={164} height={133}/>
      </div>
    </section>
  );
}

export default Loading;
