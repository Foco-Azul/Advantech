"use client";
import React, { useState, useRef } from 'react';
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
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileVacio, setFileVacio] = useState<boolean>(false);
  const [fileValidar, setFileValidar] = useState<boolean>(false);

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
     // Sanitiza el valor según el nombre del campo
     let sanitizedValue = value;

     if (name === 'name' || name === 'lastName' || name === 'referencia') {
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Validar el tamaño máximo (5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      setFileError('El archivo es demasiado grande.');
      // Puedes realizar otras acciones según tus necesidades, como limpiar el estado del archivo
      setFormData((prevData) => ({
        ...prevData,
        pdf: null,
      }));
      setFileVacio(false)
    } else {
      setFileError(null);
      setFormData((prevData) => ({
        ...prevData,
        pdf: file,
      }));
      setFileVacio(true)
    }
  };
  const handleCustomButtonClick = () => {
    // Abre el cuadro de diálogo de selección de archivos cuando se hace clic en el botón personalizado
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify({
        nombres: formData.name,
        apellidos: formData.lastName,
        email: formData.email,
        telefono: formData.phone,
        residencia: formData.pais,
        referencias: formData.referencia,
        experiencia: formData.experiencia,
        postulacion: formData.cargo
      }));

      // Agregar el archivo PDF al FormData
      if (formData.pdf) {
        formDataToSend.append('files.cv', formData.pdf);
      }

      const postResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/formulario-unete-al-equipos`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
          },
          body: formDataToSend,
          cache: 'no-store',
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
  const validarCampos = () => {
    setFileValidar(true)
  }; 
  return (
    <section className="formulario-unete_al_equipo">
      <div className="formulario-contenedor">
        {formSubmitted ? (
            // Mostrar mensaje de envío correcto si el formulario se ha enviado
            <div className="mensaje-envio">
              <p>¡Gracias por enviar tu postulación!</p>
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
                maxLength={20}
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
              {/* Este input está oculto visualmente */}
              <input
                type="file"
                id="pdf"
                accept=".pdf"
                name="pdf"
                style={{ display: 'none' }}
                ref={fileInputRef}
                required
                onChange={handleFileChange}
              />
              <div className='input'>
                <a onClick={handleCustomButtonClick}>Seleccionar archivo</a>
              </div>
              {!fileVacio && fileValidar && !fileError &&<p style={{ color: 'red' }}>Campo obligatorio</p>}
              {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
              {/* Muestra el nombre del archivo seleccionado o un mensaje predeterminado */}
              <p>Archivo seleccionado: {formData.pdf ? formData.pdf.name : 'Ninguno'}</p>
              <p>Tamaño máximo de archivo: 5MB</p>
              {/* Botón personalizado */}
            </div>
            <div className='campos'>
              <label htmlFor="referencia">Referencias*</label>
              <textarea
                id="referencia"
                name="referencia"
                value={formData.referencia}
                maxLength={500}
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
            <button className="hero-button" type="submit" onClick={validarCampos}>Enviar</button>
          </div>
        </form>
        )}
      </div>
    </section>
  );
};

export default SeccionFormulario;
