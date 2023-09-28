import image1 from './images/Historial de busquedas  1.png';
import image2 from './images/Historial de compras.png';
import image3 from './images/Imagen de ingreso al sitio.png';
import image4 from './images/Mi cuenta.png';
import image5 from './images/Página de pagos.png';
import image6 from './images/Pago exitoso.png';
import image7 from './images/Resultados de busqueda.png';

export const images: string[] = [image1.src, image2.src, image3.src, image4.src, image5.src, image6.src, image7.src];

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
