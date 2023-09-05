'use client'
import Image from 'next/image';
import Logo from "./image/logo-advantech-datos.svg"
import './Loading.css';

function Loading() {
  return (
    <section className='precarga'>
      <div className='animacion'>
        <Image src={Logo} alt="Company Logo" width={164} height={133}/>
      </div>
    </section>
  );
}

export default Loading;
