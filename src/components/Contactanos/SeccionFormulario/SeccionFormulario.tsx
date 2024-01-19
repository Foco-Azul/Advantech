"use client";
import React, { useState } from 'react';
import "./SeccionFormulario.css"
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  message: string;
  plan: string;
  lastName: string;
  phone: string;
  company: string;
  agreeTerms: boolean;
}

const SeccionFormulario: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    plan: '',
    lastName: '',
    phone: '',
    company: '',
    agreeTerms: false,
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // Nuevo estado para verificar si se envió el formulario
  
  // Función para sanitizar el campo de texto
  const sanitizeText = (input: string): string => {
    // Implementa la lógica de sanitización según tus necesidades
    // Por ejemplo, podrías usar expresiones regulares para permitir solo caracteres alfanuméricos
    return input.replace(/[^a-zA-Z0-9\s]/g, '');
  };

  // Función para sanitizar el número de teléfono
  const sanitizePhone = (input: string): string => {
    // Implementa la lógica de sanitización según tus necesidades
    // Por ejemplo, podrías usar expresiones regulares para permitir solo dígitos y algunos caracteres especiales
    return input.replace(/[^0-9+()-]/g, '');
  };

  // Función para sanitizar la dirección de correo electrónico
  const sanitizeEmail = (input: string): string => {
    // Implementa la lógica de sanitización según tus necesidades
    // En este caso, no se realiza una sanitización exhaustiva, ya que la validación de correo electrónico es más compleja
    // Puedes utilizar bibliotecas como validator.js para realizar validaciones más completas
    return input.trim();
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let sanitizedValue = value;

     if (name === 'name' || name === 'lastName' || name === 'message') {
       sanitizedValue = sanitizeText(value);
     } else if (name === 'phone') {
       sanitizedValue = sanitizePhone(value);
     } else if (name === 'email') {
       sanitizedValue = sanitizeEmail(value);
     }
     setFormData((prevData) => ({
       ...prevData,
       [name]: sanitizedValue,
     }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Realizar el POST con los datos requeridos
      const postResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/formulario-contactos`,
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
              empresa: formData.company,
              mensaje: formData.message,
              plan: formData.plan
            },
          }),
          cache: "no-store",
        }
      );

      if (postResponse.status === 200) {
        setFormSubmitted(true);
      } else {
        throw new Error(`Failed to create user, ${postResponse.status}`);
      }
    } catch (error) {
      console.error('Error sending form data to Strapi:', error);
      // Maneja el error según tus necesidades
    }
  };

  return (
    <section className="formulario-contactanos">
      <div className="formulario-contenedor">
        {formSubmitted ? (
            // Mostrar mensaje de envío correcto si el formulario se ha enviado
            <div className="mensaje-envio">
              <p>¡Tu formulario ha sido enviado exitosamente!</p>
            </div>
          ) : (
        <form className="contactanos" onSubmit={handleSubmit}>
          <div className='campos'>
            <label htmlFor="plan">Plan*</label>
            <select
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              required
            >
               <option value="">Selecciona el plan de tu interés</option>
              <option value="Personalizado">Personalizado</option>
              <option value="Estántar">Estántar</option>
              <option value="Premium">Premium</option>
              <option value="Enteprise">Enteprise</option>
            </select>
          </div>
          <div className='campos'>
            <label htmlFor="name">Nombre(s)*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              maxLength={50}
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
              maxLength={50}
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
              maxLength={50}
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
              maxLength={20}
              onChange={handleChange}
              pattern="[0-9]*"  // Expresión regular para permitir solo números
              required
            />
          </div>
          <div className='campos'>
            <label htmlFor="company">Empresa</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              maxLength={50}
              onChange={handleChange}
            />
          </div>
          <div className='campos'>
            <label htmlFor="message">Mensaje*</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              maxLength={500}
              onChange={handleChange}
              placeholder="Explícanos el motivo de tu contacto"
              required
            />
          </div>
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
          <button className="hero-button" type="submit">
            Enviar
          </button>
        </form>
        )}
      </div>
    </section>
  );
};

export default SeccionFormulario;
