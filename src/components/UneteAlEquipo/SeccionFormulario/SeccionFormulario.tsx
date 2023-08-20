"use client";
import React, { useState } from 'react';
import "./SeccionFormulario.css"
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  referencia: string;
  experiencia: string;
  lastName: string;
  phone: string;
  pais: string;
  agreeTerms: boolean;
  cargo: string;
  pdf: File | null; // Nuevo campo para almacenar el archivo PDF
}

const SeccionFormulario: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    referencia: '',
    experiencia: '',
    lastName: '',
    phone: '',
    pais: '',
    agreeTerms: false,
    cargo: 'Postulacion abierta',
    pdf: null,
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // Nuevo estado para verificar si se envió el formulario
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: !prevData[name as keyof FormData], // Cast explícito
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      pdf: file,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const postResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/formulario-unete-al-equipos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
          },
          body: JSON.stringify({
            data: {
              nombres: formData.name,
              apellidos: formData.lastName,
              email: formData.email,
              telefono: formData.phone,
              residencia: formData.pais,
              referencias: formData.referencia,
              experiencia: formData.experiencia,
              postulacion: formData.cargo
            },
          }),
          cache: "no-store",
        }
      );
      if (postResponse.status === 200) {
        console.log("Formulario enviado con éxito");
        setFormSubmitted(true);
      } else {
        console.log(postResponse.status);
        throw new Error(`Failed to create user, ${postResponse.status}`);
      }
    } catch (error) {
      console.error('Error sending form data to Strapi:', error);
      // Maneja el error según tus necesidades
    }
  };  

  return (
    <section className="formulario-unete_al_equipo">
      <div className="formulario-contenedor">
        {formSubmitted ? (
            // Mostrar mensaje de envío correcto si el formulario se ha enviado
            <div className="mensaje-envio">
              <p>¡Gracias por enviar tu psotulación!</p>
            </div>
          ) : (
        <form className="unete_al_equipo" onSubmit={handleSubmit}>
          <div className='formulario-contenido'>
            <div className='campos'>
              <label htmlFor="name">Nombre(s)*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='campos'>
              <label htmlFor="lastName">Apellidos*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='campos'>
              <label htmlFor="email">Correo electrónico*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='campos'>
              <label htmlFor="phone">Teléfono*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className='campos'>
              <label htmlFor="experiencia">Experiencia de trabajo*</label>
              <select
                id="experiencia"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="0-3 años">0 - 3 años</option>
                <option value="3-6 años">3 - 6 años</option>
                <option value="6-9 años">6 - 9 años</option>
                <option value="+10 años">+10 años</option>
              </select>
            </div>
            <div className='campos'>
              <label htmlFor="pais">País de residencia*</label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                required
              />
            </div>
            <div className='campos'>
              <label htmlFor="cargo">Cargo de postulación*</label>
              <select
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="Postulacion abierta">Postulacion abierta</option>
              </select>
            </div>
            <div className='campos'>
              <label htmlFor="pdf">Subir CV*</label>
              <input
                type="file"
                id="pdf"
                name="pdf"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <p>Tamaño máximo de archivo: 5MB</p>
            </div>
            <div className='campos'>
              <label htmlFor="referencia">Referencias*</label>
              <textarea
                id="referencia"
                name="referencia"
                value={formData.referencia}
                onChange={handleChange}
                placeholder="Explícanos el motivo de tu contacto"
                required
              />
            </div>
          </div>
          <div className='formulario-footer'>
            <div className='acuerdo ocultar'>
              <label>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <p>Estoy de acuerdo con los <Link href={"#"}>términos y condiciones.</Link></p>
              </label>
            </div>
            <button className="hero-button" type="submit">Enviar</button>
          </div>
        </form>
        )}
      </div>
    </section>
  );
};

export default SeccionFormulario;
