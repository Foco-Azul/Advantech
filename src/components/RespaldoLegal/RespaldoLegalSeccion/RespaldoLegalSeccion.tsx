"use client";
import React, { useState } from 'react';
import './RespaldoLegalSeccion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function RespaldoLegalSeccion() {
  const [activeTab, setActiveTab] = useState('TERMINOS-Y-CONDICIONES');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <section className='seccion-respaldo-legal'>
      <div className="uso_de_datos-container">
        <div className='productos-pestañas'>
          <button className={activeTab === 'TERMINOS-Y-CONDICIONES' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('TERMINOS-Y-CONDICIONES')}>TERMINOS Y CONDICIONES</button>
          <button className={activeTab === 'AVISO-DE-PRIVACIDAD' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('AVISO-DE-PRIVACIDAD')}>AVISO DE PRIVACIDAD</button>
          <button className={activeTab === 'POLITICA-DE-COOKIES' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('POLITICA-DE-COOKIES')}>POLITICA DE COOKIES</button>
          <button className={activeTab === 'POLITICAS-DE-PRIVACIDAD' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('POLITICAS-DE-PRIVACIDAD')}>POLITICAS DE PRIVACIDAD</button>
        </div>
        <div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'AVISO-DE-PRIVACIDAD' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h2>AVISO DE PRIVACIDAD</h2>
              <h4>1. INTRODUCCIÓN</h4>
              <ul>
                <li>
                  <p>
                  1.1. Cuando usa <strong>datos.advantech.com.ec</strong>, en adelante “LA PÁGINA” confía a nostros sus datos personales, es por ello que nos comprometemos a mantener, respetar y preservar esa confianza.
                  </p>
                </li>
                <li>
                  <p>
                  1.2.	En este aviso se describen los datos personales (“datos”) que recopilamos, cómo los usamos y compartimos, y sus opciones con respecto a ellos. 
                  </p>
                </li>
                <li>
                  <p>
                  1.3.	Recomendamos que lea el aviso y adicionalmente la descripción de privacidad, misma que detalla puntualmente las pácticas que tenemos sobre dichos datos.
                  </p>
                </li>
              </ul>
              <h4>2. GENERALES</h4>
              <ul>
                <li><p>2.1.	Alcance:</p></li>
                <li>
                  <ul>
                    <li>
                      <p>
                        2.1.1.	Este aviso se aplica a todos los usuarios de los servicios de la PÁGINA en cualquier jurisdicción del mundo, sin importar la plataforma que utilicen. 
                      </p>
                    </li>
                    <li>
                      <p>
                        2.1.2.	En este aviso se describe cómo la PÁGINA y sus filiales o relacionadas recopilan y usan los datos.  
                      </p>
                    </li>
                    <li>
                      <p>
                        2.1.3.	Este aviso se aplica a todos los usuarios de LA PÁGINA en todo el mundo, a menos que usen un servicio que otro aviso de privacidad cubra su jurisdicción
                      </p>
                    </li>
                    <li>
                      <p>
                      2.1.4.	Se aplica específicamente a las siguientes partes:
                      </p>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <p>
                          2.1.4.1.	Usuarios: Personas que solicitan o reciben servicios relacionados a través de su cuenta dentro de LA PÁGINA.
                          </p>
                        </li>
                        <li>
                          <p>
                          2.1.4.2.	Socios de LA PÁGINA: Personas que brindan servicios de manera individual o a través de empresas asociadas a LA PÁGINA.
                          </p>
                        </li>
                        <li>
                          <p>
                          2.1.4.3.	Usuarios invitados: Personas que reciben servicios a traves de propietarios de cuentas dentro de LA PÁGINA.
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>
                      2.1.5.	Este aviso también rige otras recopilaciones de datos de LA PÁGINA.
                      </p>
                    </li>
                    <li>
                      <p>
                      2.1.6.	Se hará referencia a todas las personas sujetas a este aviso como “usuarios”.
                      </p>
                    </li>
                    <li>
                      <p>
                      2.1.7.	Nuestras prácticas de privacidad están sujetas a las normativas legales vigentes en el país de operación de LA PÁGINA.
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
              <h4>3.	TRANSFERENCIA Y RESPONSABLE DEL TRATAMIENTO DE DATOS</h4>
              <ul>
                <li>
                  <p>
                  3.1.	La sociedad HCT International, Inc, será la responsable del tratamiento de los datos recopilados con relación al uso de los servicios de LA PÁGINA.
                  </p>
                </li>
                <li>
                  <p>
                  3.2.	LA PÁGINA opera y procesa datos personales en todo el mundo. En ese sentido, respetamos sus derechos de protección de datos, ya sea que se encuentre en su país de origen o en otro lugar.
                  </p>
                </li>
                <li>
                  <p>
                  3.3.	Esto significa que podemos transferir datos personales a distintas jurisdicciones que no sean su país de origen, con el fin de proporcionar nuestros servicios en un país diferente cuando lo solicite.
                  </p>
                </li>
                <li>
                  <p>
                  3.4.	También podemos transferir datos personales a otro país si es necesario para responder a una solicitud de soporte al cliente.
                  </p>
                </li>
                <li>
                  <p>
                  3.5.	Debido a la naturaleza de nuestros servicios, es posible que otros usuarios tengan acceso a datos personales limitados en otro país.
                  </p>
                </li>
                <li>
                  <p>
                  3.6.	Esto lo hacemos para cumplir con los acuerdos con todos nuestros usuarios o conforme a sus instrucciones o consentimiento previo, decisiones de adecuación para los países correspondientes u otros mecanismos de transferencia disponibles en virtud de la ley vigente, como las Cláusulas contractuales básicas.
                  </p>
                </li>
                <li>
                  <p>
                  3.7.	También podemos transferir datos a otros países para responder a una solicitud de datos personales de las fuerzas del orden público o requerimientos judiciales.
                  </p>
                </li>
                <li>
                  <p>
                  3.8.	A fin de proporcionar medidas de protección adicionales para estas transferencias de datos, LA PÁGINA aplica un procedimiento interno sólido para procesar dichas solicitudes. 
                  </p>
                </li>
                <li>
                  <p>
                  3.9.	LA PÁGINA solo divulga datos personales a las fuerzas del orden público de acuerdo con los requisitos reglamentarios de las leyes vigentes.
                  </p>
                </li>
                <li>
                  <p>
                  3.10.	Para brindar una protección de datos equivalente donde sea que use nuestros servicios, LA PÁGINA implementó las siguientes medidas:
                  </p>
                </li>
                <li>
                  <ul>
                    <li>
                      <p>
                      3.10.1.	Políticas y procedimientos que limitan el acceso y procesamiento de datos personales.
                      </p>
                    </li>
                    <li>
                      <p>
                      3.10.2.	Capacitación específica del personal responsable del tratamiento de los datos personales.
                      </p>
                    </li>
                    <li>
                      <p>
                      3.10.3.	Protección sólida de los datos mientras se transfieren entre LA PÁGINA y nuestros servidores, y cuando los datos se procesan en nuestros servidores. 
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
              <h4>4.	RECOPILACIÓN Y USO DE LOS DATOS PERSONALES</h4>
              <ul>
                <li>
                  <p>
                  4.1.	LA PÁGINA recopila los siguientes datos: 
                  </p>
                </li>
                <li>
                  <ul>
                    <li>
                      <p>
                      4.1.1.	Datos que los usuarios proporcionan a LA PÁGINA, como los que brindan cuando crean sus cuentas.
                      </p>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <p>
                          4.1.1.1.	Información del perfil de usuario: Recopilamos datos cuando los usuarios crean o actualizan sus cuentas, lo que puede incluir su nombre, correo electrónico, número de teléfono, nombre de usuario y contraseña, dirección, foto de perfil, detalles bancarios o de pago (incluidos los relacionados con su verificación de pago), documentos de identificación oficiales (que pueden incluir el número de identificación, así como la fecha de nacimiento, género y foto).
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.1.2.	Datos demográficos: Podemos recopilar datos demográficos sobre los usuarios, como la fecha de nacimiento, la edad, el género y la ocupación, cuando sea necesario para ciertos servicios o programas.  
                          </p>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <p>
                              4.1.1.2.1.	También podemos deducir datos demográficos a partir de otra información que recopilamos de los usuarios. 
                              </p>
                            </li>
                            <li>
                              <p>
                              4.1.1.2.2.	También podemos recopilar datos demográficos a través de encuestas a los usuarios.
                              </p>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>
                      4.1.2.	Datos que se generan cuando se utilizan nuestros servicios, como los detalles del dispositivo, ubicación y uso de LA PÁGINA.
                      </p>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <p>
                          4.1.2.1.	Datos de ubicación: Recopilamos datos de ubicación precisa o aproximada de los dispositivos móviles de los socios de LA PÁGINA.
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.2.2.	Información de transacciones: Recopilamos información sobre las transacciones relacionadas con el uso de nuestros servicios, incluida la información de la transacción de pago, mas no la información sobre el medio y datos de la forma de pago. 
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.2.3.	Datos de uso: Recopilamos información sobre cómo los usuarios interactúan con nuestros servicios. Esto incluye la fecha y hora de acceso, las páginas vistas, el tipo de navegador, los fallos de LA PÁGINA y otras actividades del sistema.
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.2.4.	Datos del dispositivo: Recopilamos datos sobre los dispositivos usados para acceder a nuestros servicios, lo que incluye modelos de hardware, dirección IP u otros identificadores únicos del dispositivo, sistemas operativos y versiones, software, idiomas preferidos, identificadores de publicidad, información de movimiento del dispositivo y datos de la red.
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>
                      4.1.3.	Datos de otras fuentes, como otros usuarios o propietarios de cuentas, socios comerciales, proveedores generales, de seguros o de soluciones financieras, y autoridades gubernamentales.
                      </p>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <p>
                          4.1.3.1.	Socios comerciales de LA PÁGINA relacionados con tarjetas de débito o de crédito emitidas por una institución financiera asociada con LA PÁGINA, en la medida en que se indique en los Términos y condiciones de la tarjeta.
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.3.2.	Proveedores que nos ayudan a verificar la identidad de los usuarios, información de antecedentes y cumplimiento de los requisitos.
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.3.3.	Proveedores que revisan las cuentas de los usuarios en relación con sanciones, lavado de dinero o exigencias relativas a la identificación del cliente.
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.3.4.	Fuentes disponibles públicamente.
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.3.5.	Proveedores de servicios de marketing o distribuidores de datos, cuya información LA PÁGINA usa con fines publicitarios o de investigación.
                          </p>
                        </li>
                        <li>
                          <p>
                          4.1.3.6.	Funcionarios de salud pública o de la fuerza del orden público y otras autoridades gubernamentales.
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <h4>5.	USO DE LOS DATOS PERSONALES</h4>
              <ul>
                <li>
                  <p>
                  5.1.	Usamos los datos para lo siguiente:
                  </p>
                </li>
                <li>
                  <ul>
                    <li>
                      <p>
                      5.1.1.	Mejorar la seguridad de los usuarios y de los servicios
                      </p>
                    </li>
                    <li>
                      <p>
                      5.1.2.	Brindar soporte al cliente  
                      </p>
                    </li>
                    <li>
                      <p>
                      5.1.3.	Realizar tareas de investigación y de desarrollo, así como desarrollar productos propios. 
                      </p>
                    </li>
                    <li>
                      <p>
                      5.1.4.	Permitir la comunicación entre usuarios 
                      </p>
                    </li>
                    <li>
                      <p>
                      5.1.5.	Hacer campañas de marketing y publicidad
                      </p>
                    </li>
                    <li>
                      <p>
                      5.1.6.	Enviar comunicaciones no comerciales a los usuarios
                      </p>
                    </li>
                    <li>
                      <p>
                      5.1.7.	Abordar temas relacionados con procedimientos legales
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
              <h4>6.	COOKIES Y TECNOLOGIA DE TERCEROS</h4>
              <ul>
                <li>
                  <p>
                  6.1.	LA PÁGINA y sus socios usan cookies y otras tecnologías de identificación en las apps, sitios web, correos electrónicos y anuncios en línea para los fines descritos en este aviso. 
                  </p>
                </li>
                <li>
                  <p>
                  6.2.	Las cookies son pequeños archivos de texto que los sitios web, apps, medios en línea y anuncios almacenan en el navegador o en el dispositivo. 
                  </p>
                </li>
                <li>
                  <p>
                  6.3.	LA PÁGINA usa cookies y tecnologías similares para autenticar usuarios, recordar las preferencias y configuraciones del usuario, determinar la popularidad del contenido, entregar campañas publicitarias y medir su eficacia y analizar el tránsito y las tendencias del sitio para comprender los comportamientos en línea y los intereses de las personas que interactúan con nuestros servicios.
                  </p>
                </li>
                <li>
                  <p>
                  6.4.	Adicionalmente LA PÁGINA permite que terceros realicen mediciones de audiencia y servicios analíticos. CONSERVACIÓN Y ELIMINACIÓN DE LOS DATOSLA PÁGINA conserva los datos del usuario por el tiempo que sea necesario para cumplir con los fines descritos anteriormente y conforme la normativa legal vigente.LA PÁGINA permite a los usuarios acceder o controlar los datos que recopila, desde la configuración de privacidad dentro de LA PÁGINA.ACTUALIZACIONES DEL AVISOEs posible que actualicemos este aviso ocasionalmente. Si realizamos cualquier actualización se notificará al usuario a través de LA PÁGINA y por medio correo electrónico. El uso de nuestros servicios después de una actualización constituye el consentimiento del aviso modificado en la medida en que la ley lo permita.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'POLITICA-DE-COOKIES' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h2>POLÍTICA DE COOKIES</h2>
              <p>
              Las cookies son pequeños fragmentos de texto que se utilizan para almacenar información en navegadores web. Se usan para almacenar y recibir identificadores y otros datos en computadoras, teléfonos y otros dispositivos. Otras tecnologías, incluidos datos que almacenamos en tu navegador web o dispositivo, identificadores asociados con tu dispositivo y otro software, se utilizan con fines similares. En esta política, nos referimos a todas estas tecnologías con el nombre de "cookies".
              </p>
              <br />
              <h4>1.	USO DE COOKIES</h4>
              <ul>
                <li>
                  <p>
                  1.1.	Ayudan a proteger y mejorar el producto ofrecido en la página web por LA PAGINA, como personalizar el contenido, anuncios, rendimiento y ofrecer una experiencia más segura. Las cookies de sesión se eliminan cuando se cierra el navegador y las cookies persistentes son las que se mantienen en el navegador hasta que se caducan o hasta que el mismo USUARIO las elimina. Las cookies cambian a medida que la página web mejore o se actualice en sus productos.
                  </p>
                </li>
              </ul>
              <h4>2.	FINES DE COOKIES </h4>
              <ul>
                <li>
                  <p>
                  2.1.	Para verificar la cuenta y determinar el momento en que se inicia sesión, ayuda a que se acceda con mayor facilidad a los productos que ofrece la página web. Tener la posibilidad de navegar en otras páginas web y que la sesión se mantenga abierta, ayuda a recordar el navegador que se usa. 
                  </p>
                </li>
                <li>
                  <p>
                  2.2.	Se usan para proteger las cuentas, los datos y los productos que se ofrecen en la página web. En caso de un acceso no autorizado, las cookies ayudan a determinar e instalar medidas adicionales de seguridad, otro caso frecuente es el olvido de la contraseña, las cookies sirven para almacenar información que nos permita recuperar la cuenta.
                  </p>
                </li>
                <li>
                  <p>
                  2.3.	También utilizamos cookies para combatir actividades que infringen nuestras políticas o están en contra de la normativa vigente, como fraudes, falsificación de datos, spam, phishing, malware (programa maligno) y ataques de ciberseguridad.
                  </p>
                </li>
                <li>
                  <p>
                  2.4.	Se utilizan cookies para hacer recomendaciones o publicidad de otros negocios u organizaciones, para medir el rendimiento de las campañas publicitarias y las personas que interactúan con estos anuncios.
                  </p>
                </li>
                <li>
                  <p>
                  2.5.	Para ofrecer contenido relevante y según las preferencias, con el objetivo de mejorar los servicios y productos, proporcionar una experiencia más segura y útil al ingreso a la página web.
                  </p>
                </li>
              </ul>
              <h4>3.	CONTROL</h4>
              <ul>
                <li>
                  <p>
                  3.1.	El USUARIO puede configurar su navegador para instalar o eliminarlas, sin embargo, se debe tener en cuenta que podría afectar la funcionalidad de la pagina web. 
                  </p>
                </li>
                <li>
                  <p>
                  3.2.	Detalle de las cookies y su aceptación
                  </p>
                </li>
                <li>
                  <ul>
                    <li>
                      <p>
                      3.2.1.	Sin una cuenta
                      </p>
                    </li>
                    <li>
            
                        <table className='tabla-cookies'>
                          <tr>
                            <th>NOMBRE</th>
                            <th>ORIGEN</th>
                          </tr>
                          <tr>
                            <td>1P_JAR</td>
                            <td>Google Ads Optimization</td>
                          </tr>
                          <tr>
                            <td>__stripe_mid</td>
                            <td>Stripe</td>
                          </tr>
                          <tr>
                            <td>__stripe_sid</td>
                            <td>Stripe</td>
                          </tr>
                          <tr>
                            <td>_ga</td>
                            <td>Google Analytics</td>
                          </tr>
                          <tr>
                            <td>_ga_H77JWD9QJ9</td>
                            <td>Google Analytics</td>
                          </tr>
                        </table>
                      
                    </li>
                    <li>
                      <p>
                      3.2.2.	Con una cuenta
                      </p>
                    </li>
                    <li>
                      
                      <table className='tabla-cookies'>
                          <tr>
                            <th>NOMBRE</th>
                            <th>ORIGEN</th>
                          </tr>
                          <tr>
                            <td>1P_JAR</td>
                            <td>Google Ads Optimization</td>
                          </tr>
                          <tr>
                            <td>__stripe_mid</td>
                            <td>Stripe</td>
                          </tr>
                          <tr>
                            <td>__stripe_sid</td>
                            <td>Stripe</td>
                          </tr>
                          <tr>
                            <td>_ga</td>
                            <td>Google Analytics</td>
                          </tr>
                          <tr>
                            <td>_ga_H77JWD9QJ9</td>
                            <td>Google Analytics</td>
                          </tr>
                          <tr>
                            <td>appSession</td>
                            <td>datos.advantech.com.ec</td>
                          </tr>
                        </table>
                      
                    </li>
                    <li>
                      <p>
                      3.2.3.	En calidad incognito
                      </p>
                    </li>
                    <li>
                      
                      <table className='tabla-cookies'>
                          <tr>
                            <th>NOMBRE</th>
                            <th>ORIGEN</th>
                          </tr>
                          <tr>
                            <td>__stripe_mid</td>
                            <td>Stripe</td>
                          </tr>
                          <tr>
                            <td>__stripe_sid</td>
                            <td>Stripe</td>
                          </tr>
                          <tr>
                            <td>_ga</td>
                            <td>Google Analytics</td>
                          </tr>
                          <tr>
                            <td>_ga_H77JWD9QJ9</td>
                            <td>Google Analytics</td>
                          </tr>
                        </table>
                      
                    </li>
                  </ul>
                </li>
              </ul>
             
            </div>
          </div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'POLITICAS-DE-PRIVACIDAD' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h2>POLÍTICAS DE PRIVACIDAD</h2>
              <p>
              LA PAGINA es consciente de la necesidad y la obligación de protección de los datos personales, por lo cual es categórica la aplicación de la normativa ecuatoriana, la Constitución y la Ley Orgánica de Protección de Datos Personales. Agradecemos la confianza de los USUARIOS y es por ello, nuestro compromiso del cuidado y prudencia de sus datos. <br />
              Estas políticas de privacidad describen como LA PAGINA recopila y procesa la información proporcionada por los USUARIOS a través de la página web. Al utilizar nuestra página web el USUARIO es consciente de las prácticas descritas en este Aviso de Privacidad.
              </p>
              <br />
              <h4>1.	Información personal que recopila LA PAGINA.</h4>
              <ul>
                <li>
                  <p>
                  1.1.	Para la creación del usuario en la página web, debe proporcionar datos que incluye nombres, apellidos, dirección de correo electrónico, el USUARIO tiene la posibilidad de no brindar determinados datos. Sin embargo, si así lo hace, no podrá disfrutar de muchas de las funciones que LA PAGINA ofrece. <br />
                  Cabe recalcar que, toda esta información es dada con consentimiento y voluntad del USUARIO y estos datos no serán tratados como medios o fines ilícitos e ilegales por parte de LA PAGINA.
                  </p>
                </li>
                <li>
                  <p>
                  1.2.	Recopilamos y almacenamos automáticamente determinados tipos de información acerca de su uso en la página web, que incluye la información sobre su interacción con productos, el contenido y los servicios disponibles a través de LA PAGINA. Al igual que muchos sitios web, utilizamos "cookies" y otros identificadores únicos, y obtenemos ciertos tipos de información cuando su navegador web o dispositivo accede a la página web y a otro contenido servido por LA PAGINA o en su nombre en otros sitios web.
                  </p>
                </li>
                <li>
                  <p>
                  1.3.	Respecto al tema de compras, se deberá proporcionar otro tipo de información para registrar el pago, que eso será a través del botón de pagos, tal como lo establece el Acuerdo de Términos y Condiciones. 
                  </p>
                </li>
                <li>
                  <p>
                  1.4.	El USUARIO puede acceder a su información en cualquier momento, su perfil estará habilitado hasta cuando el USUARIO lo decida.
                  </p>
                </li>
              </ul>
              <h4>2.	FINES DE LA PÁGINA PARA UTILIZAR SU INFORMACIÓN</h4>
              <ul>
                <li>
                  <p>
                  2.1.	Se utiliza la información personal para proporcionar mejores servicios, como la corrección de errores en la página web, analizar el rendimiento y eficacia en la prestación del servicio por parte de LA PAGINA.
                  </p>
                </li>
                <li>
                  <p>
                  2.2.	Según el historial de compra en la página web, identificar las preferencias y personalizar la experiencia en la misma con recomendaciones de nuevos productos o servicios. 
                  </p>
                </li>
                <li>
                  <p>
                  2.3.	Para el cumplimiento de la normativa legal vigente del Ecuador, recopilar información para verificar la identidad de la persona y evitar cualquier conducta ilegal, como fraudes y abusos, con la finalidad de protección de los demás USUARIOS. 
                  </p>
                </li>
                <li>
                  <p>
                  2.4.	Es importante para LA PAGINA tener información para un contacto continuo con el USUARIO y solventar cualquier inquietud en el menor tiempo posible.
                  </p>
                </li>
                <li>
                  <p>
                  2.5.	Se debe manifestar que, se le informará al USUARIO con el objeto de que tenga la oportunidad de decidir si no desea compartir dicha información.
                  </p>
                </li>
              </ul>
              <h4>3.	MARCO DE PROTECCIÓN DE LOS DATOS PERSONALES</h4>
              <ul>
                <li>
                  <p>
                  3.1.	La Constitución de la Republica del Ecuador establece que el Estado reconoce y garantiza el derecho de la protección de datos, por lo cual, la recolección, archivo, distribución o difusión de los datos personales estará en la potestad del titular solamente. 
                  </p>
                </li>
                <li>
                  <p>
                  3.2.	La Ley Orgánica de Protección de Datos Personales da unas directrices para el manejo de estos, garantiza el derecho que tiene todo ciudadano de que sus datos sean protegidos, con un tratamiento legítimo a los datos personales, que consiste en el buen uso y no con fines ilícitos o ilegales.
                  </p>
                </li>
                <li>
                  <p>
                  3.3.	El consentimiento y la voluntad del USUARIO al momento de ingresar a la página web y proporcionar sus datos es indispensable, al igual de la obligación que tiene este, de proporcionar datos de calidad, con exactitud y una constante rectificación o actualización, como lo menciona la normativa ecuatoriana. 
                  </p>
                </li>
                <li>
                  <p>
                  3.4.	LA PAGINA implementa todas las medidas de seguridad adecuadas y necesarias para la protección de los datos personales, consiste en una verificación, evaluación y valoración continua y permanente de la eficiencia y eficacia de las medidas de carácter técnico para garantizar y mejorar la seguridad respecto al tratamiento de los datos personales, tal como lo exige la normativa. 
                  </p>
                </li>
                <li>
                  <p>
                  3.5.	En caso de vulneración, LA PAGINA notificará a las autoridades correspondientes como lo establece La Ley Orgánica de Protección de Datos Personales, a la Autoridad de Protección de Datos Personales y a la Agencia de Regulación y Control de las Telecomunicaciones. 
                  </p>
                </li>
              </ul>
              <h4>4.	AVISO</h4>
              <ul>
                <li>
                  <p>
                  4.1.	Si usted decide usar la página web de LA PAGINA, cualquier disputa sobre la privacidad están sujetos a los términos y condiciones de LA PAGINA y a la aplicación de la ley ecuatoriana. 
                  </p>
                </li>
                <li>
                  <p>
                  4.2.	Si tiene cualquier inquietud en relación con la privacidad, le pedimos que nos contacte con una descripción detallada y nosotros trataremos de resolverla.
                  </p>
                </li>
                <li>
                  <p>
                  4.3.	Debe consultar nuestros sitios web con frecuencia para ver los cambios recientes. A menos que se indique lo contrario, nuestro Aviso de Privacidad actual será aplicable a toda la información que tenemos referente a usted y a su cuenta. No obstante, somos fieles a nuestra palabra y en ningún caso modificaremos sustancialmente nuestras políticas ni prácticas para hacerlas menos eficaces en la protección de los datos personales de nuestros clientes recabados en el pasado sin el consentimiento previo de los clientes afectados.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'TERMINOS-Y-CONDICIONES' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h2>TERMINOS Y CONDICIONES</h2>
              <p>
              Los presentes términos y condiciones generales de uso e información legal (en adelante, términos y condiciones) se aplican a la página, cuyo dominio es <a href="https://www.datos.advantech.com.ec/"><strong>https://www.datos.advantech.com.ec/</strong></a> sitio web propiedad de HCT INTERNATIONAL, INC.
              Al utilizar el sitio, muestra su conformidad con los presentes términos y condiciones de uso. Si no se encuentra de acuerdo, no usarlo. <br />
              Los presentes términos y condiciones tienen carácter obligatorio y vinculante. Aplican a todos las compras, registros y acciones realizadas mediante la página Web. El uso de la Página Web implica el conocimiento y aceptación de ellos. <br />
              A través de los presentes términos y condiciones, HCT INTERNATIONAL, INC pone a disposición de los usuarios el sitio web <a href="https://www.datos.advantech.com.ec/"><strong>https://www.datos.advantech.com.ec/</strong></a> (en adelante LA PAGINA) y el USUARIO en estos Términos de uso señalan al miembro que creó la cuenta. 
              En cumplimiento de lo establecido en la normativa ecuatoriana, se exponen los siguientes datos identificativos del titular del sitio: 
              </p>
              <ul>
                <li>
                  <p>
                  •	Razón social: HCT INTERNATIONAL, INC.<br />
                  •	Domicilio Legal: 2918 Bridle Brook Way Charlotte, NC 28270 Mecklenburg County<br />
                  •	ID NUMBER: 1714639
                  </p>
                </li>
              </ul>
              <h4>1.	TÉRMINOS DE USO.</h4>
              <p>
              El acceso a la Página Web, y la creación de un perfil por parte del USUARIO, implica el conocimiento y la aceptación expresa e inequívoca de los presentes Términos y Condiciones Generales de Uso, Contratación, la Política de Privacidad y la aceptación de la Política de Cookies por parte de todos los USUARIOS, en el cual cada USUARIO expresa su consentimiento de comunicar sus datos personales en la Página Web y la misma, hará uso con interés legítimo, tal como lo establece la Ley Orgánica de Protección de Datos Personales. <br />
              El software de LA PAGINA es desarrollado para HCT INTERNATIONAL, INC
              </p>
              <br />
              <h4>2.	SERVICIO.</h4>
              <p>
              La Página Web, ofrece información actualizada periódicamente, para que el servicio sea adquirido por los USUARIOS. <br />
              El USUARIO podrá acceder a bases de datos con información de fuentes públicas, páginas web con información pública de terceros, de manera sistematizada.
              </p>
              <br />
              <h4>3.	ACCESO Y REGISTRO PARA CLIENTES.</h4>
              <p>
              Para la creación de un USUARIO de la Página Web es indispensable que se cumplan los siguientes requisitos: 
              </p>
              <ul>
                <li>
                  <p>
                  •	Haber cumplido o ser mayor de 18 años. <br />
                  •	Completar de manera veraz los campos obligatorios del formulario de registro, en el que se solicitan datos de carácter  personal como nombre de USUARIO, correo electrónico. <br />
                  •	Contar con correo electrónico para su registro y notificaciones. <br />
                  •	Aceptar las presentes Condiciones de Uso. <br />
                  •	Aceptar la Política de Privacidad. <br />
                  •	Aceptar la Política de Cookies. <br />
                  </p>
                </li>
              </ul>
              <p>
              El USUARIO garantiza que todos los datos sobre su identidad y legitimidad facilitados en la Página Web son veraces, exactos, completos y se compromete a mantenerlos actualizados, tal cual lo establece la Ley Orgánica de Protección de Datos Personales en su artículo 10 literal h). <br />
              Todo contenido brindado por LA PAGINA, es de uso personal, la información otorgada al USUARIO no transfiere ningún título o interés, es de carácter informativo. <br />
              El USUARIO puede acceder al contenido de LA PAGINA solo en los lugares geográficos en los que ofrecemos nuestro servicio y donde se tenga licencia para ese contenido, el contenido que puede estar disponible puede variar según la ubicación geográfica y cambia periódicamente. <br />
              En el supuesto en que el USUARIO facilite cualquier dato falso, inexacto o incompleto o si LA PÁGINA considera que existen motivos fundados para dudar sobre la veracidad, exactitud e integridad de estos, podrá denegarle el acceso y uso de la Página Web o de cualquiera de sus contenidos y/o servicios. <br />
              El uso de la información obtenida en la página web, incluye todas las características y funcionalidades asociadas con esta, conforme a lo establecido en todas las leyes, normas y reglamentaciones vigentes, o cualquier otra restricción al uso del servicio o su contenido. 
              </p>
              <br />
              <h4>4.	PERFIL.</h4>
              <p>
              Para crear un usuario en la Página Web, el USUARIO seleccionará un nombre de usuario y una clave de acceso, tanto el nombre de usuario como la contraseña son estrictamente confidenciales, personales e intransferibles. La responsabilidad del uso de las credenciales de acceso a la página web es responsabilidad del USUARIO toda vez que, la página Web no puede garantizar la seguridad de estas si el USUARIO las usa en otro tipo de páginas o plataformas. <br />
              Una vez completado el registro, todo USUARIO podrá acceder a su perfil y completarlo, y editarlo y/o darse de baja según estime conveniente. LA PAGINA no almacena los datos de pago de los USUARIOS, que serán tratados y almacenados por el prestador de servicios de pago según descrito en las presentes Condiciones y en la Política de Privacidad. <br />
              Específicamente para los datos de las tarjetas bancarias, se hace constar que LA PAGINA no almacena los datos facilitados por los USUARIOS, siendo tratados por los procesadores de pagos con los que LA PAGINA mantiene un acuerdo comercial para la tramitación de los pagos de compras que se realicen en la página web.
              </p>
              <br />
              <h4>5.	PAGO O MEMBRESIA</h4>
              <p>
              Los USUARIOS son responsables de la información que envían para el pago, la PAGINA no puede garantizar la identidad de los USUARIOS registrados, es indispensable que los USUARIOS informen a LA PAGINA si la tarjeta de crédito asociada al perfil hubiera sido robada, y/o se estuviera utilizando por un tercero de forma fraudulenta para suspender el servicio en seguridad del USUARIO, adicionalmente deben realizar la denuncia ante la autoridad correspondiente en caso de robo, sustracción o sospecha de un mal uso de su tarjeta de crédito. <br />
              LA PAGINA adquiere el compromiso de colaborar con el USUARIO y las autoridades competentes, si así fuera necesario, para facilitar la prueba fehaciente del cargo indebido. <br />
              En caso de fraude, LA PAGINA se reserva el derecho a interponer las acciones que en su caso fueran menester cuando resulte perjudicado por el uso indebido del sitio. <br />
              Al momento de confirmación de la compra y al registrar una cuenta personal, el usuario recibirá en su casilla de correo electrónico una confirmación de que la cuenta ha sido registrada, LA PAGINA pondrá un aviso en la Página Web, alertando a los USUARIOS sobre algún cambio, durante un tiempo razonable. <br />
              Sin perjuicio de lo anterior, los USUARIOS son responsables de leer estos términos y condiciones cada vez que ingresen a la Página Web para ver si han sufrido modificaciones. <br />
              </p>
              <br />
              <h4>6.	INTERRUPCION DEL SERVICIO - EXCLUSIÓN DE RESPONSABILIDAD.</h4>
              <p>
              LA PAGINA se reserva el derecho de interrumpir, suspender o modificar en cualquier momento los servicios ofrecidos en la Página Web, ya sea en forma permanente o transitoria. <br />
              No se requerirá la conformidad de los USUARIOS, ni será necesario aviso previo alguno, siempre se respetará el plazo de servicio contratado por EL USUARIO pudiendo, de estar vigente, no renovarlo. <br />
              Asimismo, no garantiza el acceso o uso permanente de la Página Web, ya que éste podría interrumpirse por cuestiones técnicas ajenas a LA PAGINA. <br />
              No obstante, lo mencionado anteriormente, si la suspensión o interrupción mencionada no obedeciere a razones de fuerza mayor o caso fortuito, LA PAGINA se compromete a cumplir las prestaciones que estuvieran pendientes al momento de la suspensión o interrupción, sin embargo, no garantiza que LA PAGINA se encuentre libre de virus, gusanos o cualquier otro elemento que pueda llegar a dañar o alterar el normal funcionamiento de un ordenador. No se responsabiliza por cualquier daño que pueda producirse en los equipos informáticos de los USUARIOS o de terceros como consecuencia de la navegación en la Página Web. <br />
              Es responsabilidad y obligación exclusiva del USUARIO contar con las herramientas adecuadas para detectar, desinfectar y/o prevenir cualquier tipo de elementos y/o posibles daños de esta naturaleza. 
              </p>
              <br />
              <h4>7.	FORMAS DE PAGO.</h4>
              <p>
              El pago de la información que se encuentra en la página web, LA PAGINA lo recibe en las cuentas de esta mediante el botón de pagos, mismo que, como fue señalado previamente, no le pertenece a LA PAGINA, sino que es proporcionado por un tercero, mediante un contrato. <br />
              Para proceder al pago, el USUARIO deberá seguir todas y cada una de las instrucciones que aparecen en pantalla, proporcionando la siguiente información:  <br />
              a) Número de tarjeta de crédito o débito; <br />
              b) Fecha de caducidad, así como <br />
              c) cualquier otra que se exija en pantalla. <br />
              Todos los datos proporcionados a estos efectos son encriptados para garantizar la máxima seguridad de estos. <br />
              Los datos del USUARIO se alojan en un servidor seguro propiedad del botón de pagos. <br />
              Asimismo, LA PAGINA manifiesta que, en ningún caso almacena los datos de pago proporcionados por los USUARIOS. <br />
              LA PAGINA entregará la información adquirida por el USUARIO, en las condiciones establecidas de acuerdo con el contenido y al precio adquirido. <br />
              Si el USUARIO tiene algún problema con el desarrollo de su servicios, programa o producto, podrá contactar al servicio de atención al USUARIO <a href="mailto:soporte@advantech.com.ec" target='blank_'><strong>soporte@advantech.com.ec</strong></a>.
              </p>
              <br />
              <h4>8.	FACTURACIÓN.</h4>
              <p>
              El USUARIO tendrá a su disposición la factura con la información clara y precisa de la información comprada, el método, plan de pago, y la moneda para la transacción. Las facturas son emitidas por LA PAGINA. <br />
              La Facturación cumple con los requisitos que la Norma Tributaria del país donde la sociedad se encuentra domiciliada lo exige, así como con los impuestos que la misma determina para este servicio. 
              </p>
              <br />
              <h4>9.	OBLIGACIONES DEL USUARIO.</h4>
              <p>
              Los USUARIOS son completamente responsables del acceso y correcto uso de su perfil y demás contenidos de la Página Web y adquiere el compromiso de observar diligentemente las presentes Condiciones Generales de Uso. <br />
              Los USUARIOS se abstendrán de usar su perfil y el resto de los contenidos de la Página Web con fines o efectos ilícitos y que sean lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, afectar o deteriorar la Página Web, sus contenidos y sus servicios. <br />
              Quienes incumplan tales obligaciones responderán de cualquier perjuicio o daño que ocasionen. LA PAGINA no responderá de ninguna consecuencia, daño o perjuicio que pudiera derivarse de dicho acceso o uso ilícito por parte de terceros. En general, los USUARIOS se comprometen, a título enunciativo y no taxativo, a: 
              </p>
              <ul>
                <li>
                  <p>
                  9.1.	No archivar, reproducir, distribuir, modificar, mostrar, presentar, publicar, otorgar licencias, crear obras derivadas, ofrecer en venta, o usar contenido e información contenida de la página web.
                  </p>
                </li>
                <li>
                  <p>
                  9.2.	No eludir, eliminar, alterar, desactivar, disminuir, bloquear, ocultar ni obstaculizar ninguna de las medidas de protección de contenido u otros elementos del servicio de la página web, incluida la interfaz gráfica de usuario, los avisos de derechos de autor y las marcas comerciales. 
                  </p>
                </li>
                <li>
                  <p>
                  9.3.	No usar ningún robot, spider, scraper u otra forma automatizada para acceder al servicio de la página web ni descompilar, realizar ingeniería inversa, desarmar el software u otro producto o proceso a los que se acceda a través del servicio de la página web.
                  </p>
                </li>
                <li>
                  <p>
                  9.4.	No introducir de ninguna manera un código o producto ni manipular el contenido del servicio de la página web.
                  </p>
                </li>
                <li>
                  <p>
                  9.5.	No infringir los derechos de propiedad industrial e intelectual o las normas reguladoras de la protección de datos de carácter personal
                  </p>
                </li>
                <li>
                  <p>
                  9.6.	No realizar acciones publicitarias de bienes o servicios sin el previo consentimiento de LA PAGINA.
                  </p>
                </li>
              </ul>
              <p>
              La responsabilidad del acceso y el uso del internet es del usuario, por lo tanto LA PAGINA no acarrea responsabilidad alguna derivada de dicho acto. <br />
              El USUARIO debe tener en cuenta que LA PAGINA puede cancelar o restringir su uso si usted viola estos Términos de uso o está involucrado en el uso del servicio de forma ilegal o fraudulenta. <br />
              Cualquier USUARIO podrá reportar a otro USUARIO cuando considere que está incumpliendo las presentes Condiciones Generales de Uso, asimismo todos los USUARIOS pueden informar a LA PAGINA de cualquier abuso o vulneración de las presentes condiciones, a través del Formulario de Incidencias, LA PAGINA verificará este reporte, a la mayor brevedad posible, y adoptará las medidas que considere oportunas, reservándose el derecho a retirar y/o suspender a cualquier USUARIO de la Página Web por el incumplimiento de las presentes Términos y Condiciones. 
              </p>
              <br />
              <h4>10.	ELIMINACION DEL USUARIO. </h4>
              <p>
              El USUARIO podrá eliminarse de la Página Web por inactividad, solicitud de USUARIO o decisión de la Página Web y esto se comunicará mediante un correo electrónico a través del Formulario de Contacto o a través de su perfil en la página web. <br />
              La información del usuario se mantendrá en la plataforma para fines estadísticos.
              </p>
              <br />
              <h4>11.	RESPONSABILIDAD DE LA PAGINA.</h4>
              <p>
              El USUARIO es responsable de contar con los servicios y equipos necesarios para la navegación por Internet y para acceder a la Página Web. <br />
              En caso de cualquier incidencia o dificultad para acceder a la Página Web, el USUARIO puede informarlo a través de los canales de contacto puestos a disposición del USUARIO, que procederá a analizar la incidencia y dará indicaciones al USUARIO acerca de cómo resolverla en el plazo más breve posible. <br />
              LA PAGINA no responderá en caso de interrupciones del servicio, errores de conexión, falta de disponibilidad o deficiencias en el servicio de acceso a Internet, ni por interrupciones de la red de Internet o por cualquier otra razón ajena a su control. <br />
              LA PAGINA no se hace responsable de los errores de seguridad que se puedan producir ni de los daños que puedan causarse al sistema informático del USUARIO (hardware y software), a los ficheros o documentos almacenados en el mismo, como consecuencia de: 
              </p>
              <ul>
                <li>
                  <p>
                  11.1.	La presencia de un virus en el sistema informático o terminal móvil del USUARIO que sea utilizado para la conexión a los servicios y contenidos de la Página Web; 
                  </p>
                </li>
                <li>
                  <p>
                  11.2.	Un mal funcionamiento del navegador; 
                  </p>
                </li>
                <li>
                  <p>
                  11.3.	Del uso de versiones no actualizadas del mismo. <br />
                  Dentro de la información ofertada por LA PAGINA no se responsabiliza por el mal uso que los USUARIOS o terceras personas den a dicha plataforma, así como los datos que puedan por dichos medios acceder personas no autorizadas para los efectos. 
                  </p>
                </li>
              </ul>
              <h4>12.	PROPIEDAD INTELECTUAL.</h4>
              <p>
              LA PAGINA es titular o licenciataria de todos los derechos de propiedad intelectual e industrial incluidos en el Sitio, así como sobre los contenidos accesibles a través de esta. <br />
              Los derechos de propiedad intelectual de la Página web, así como: textos, imágenes, fotografías,  diseño gráfico, estructura de navegación, Know How, información y contenidos del programa son titularidad de LA PAGINA, a quien corresponde el ejercicio exclusivo de los derechos de explotación de los mismos en cualquier forma y, en especial, los derechos de reproducción, distribución, comunicación pública y transformación, de conformidad con la legislación ecuatoriana de derechos de propiedad intelectual e industrial. <br />
              Dicha protección se extiende a lo existente al momento de la suscripción y hacia el futuro. <br />
              En esos supuestos, LA PAGINA adquiere los contenidos de fuentes accesibles al público y en ningún caso se entenderá que LA PAGINA tenga relación con algún derecho de titularidad. <br />
              La autorización al USUARIO para el acceso a la Pagina Web no supone renuncia, transmisión, licencia o cesión total ni parcial sobre derechos de propiedad intelectual o industrial por parte de LA PAGINA. <br />
              No está permitido suprimir, eludir o manipular de ningún modo los contenidos de la Pagina Web de LA PAGINA. <br />
              Asimismo, está prohibido modificar, copiar, reutilizar, grabar, explotar, reproducir, comunicar públicamente, hacer segundas o posteriores publicaciones, cargar archivos, enviar por correo, transmitir, usar, tratar o distribuir de cualquier forma la totalidad o parte de los contenidos incluidos en LA PAGINA para propósitos públicos o comerciales, si no se cuenta con la autorización expresa y por escrito de LA PAGINA o, en su caso, del titular de los derechos a que corresponda. <br />
              El USUARIO que proceda a compartir cualquier tipo de contenido a través de la Página Web, asegura que ostenta los derechos necesarios para hacerlo, quedando exento LA PAGINA de cualquier responsabilidad sobre el contenido y legalidad de la información ofrecida. <br />
              Todo lo que compartan los USUARIOS en la plataforma, LA PAGINA tendrá la máxima amplitud permitida por la legislación vigente, de los derechos de explotación de propiedad intelectual o industrial derivados de tales contenidos. 
              </p>
              <br />
              <h4>13.	NOTIFICACIONES.</h4>
              <p>
              Todas las notificaciones y/o comunicaciones que deban efectuarse por el uso de la Página Web bajo estos términos y condiciones generales, deberán realizarse por escrito: al USUARIO: mediante correo electrónico, a la cuenta de correo consignada por éste, o por carta documento, al domicilio declarado al inicio de este documento o a la cuenta de correo soporte@advantech.com.ec o a su domicilio legal enunciado en el inicio del presente documento. 
              </p>
              <br />
              <h4>14.	JURISDICCIÓN</h4>
              <p>
              Los presentes términos y condiciones se encuentran regidos sin excepción y en todos sus puntos por las leyes de la República del Ecuador y serán interpretados de acuerdo con ellas. <br />
              Ante cualquier diferencia, desacuerdo o conflicto derivado de la interpretación, validez, alcance y/o aplicación de los presentes términos y condiciones generales, los USUARIOS se comunicarán con LA PAGINA haciéndole llegar su reclamo, para que las partes traten de lograr un acuerdo. <br />
              Cualquier disputa o reclamo relacionado, en cualquier sentido, con el uso de cualquier Servicio de LA PAGINA, será resuelto por un Tribunal de Arbitraje de la Cámara de Comercio de Quito, que se sujetará a lo dispuesto en la Ley de Arbitraje y Mediación, al reglamento del Centro de Arbitraje y Mediación de la Cámara de Comercio de Quito y a las siguientes normas: 
              </p>
              <ul>
                <li>
                  <p>
                  14.1.	Los árbitros serán seleccionados conforme lo establecido en la Ley de Arbitraje y Mediación. 
                  </p>
                </li>
                <li>
                  <p>
                  14.2.	Las partes renuncian a la jurisdicción ordinaria, se obligan a acatar el laudo que expida el Tribunal Arbitral y se comprometen a no interponer ningún tipo de recurso en contra del laudo arbitral. 
                  </p>
                </li>
                <li>
                  <p>
                  14.3.	Para la ejecución de las medidas cautelares, el Tribunal Arbitral tiene la facultad de solicitar de los funcionarios públicos, judiciales, policiales y administrativos su cumplimiento, sin que sea necesario recurrir a juez ordinario alguno. 
                  </p>
                </li>
                <li>
                  <p>
                  14.4.	El Tribunal Arbitral está integrado por tres árbitros que integrarán el tribunal arbitral e.- El procedimiento arbitral será confidencial y en derecho. 
                  </p>
                </li>
                <li>
                  <p>
                  14.5.	El lugar de arbitraje será en las instalaciones del Centro de Arbitraje y Mediación de la Cámara de Comercio de Quito. 
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RespaldoLegalSeccion;
