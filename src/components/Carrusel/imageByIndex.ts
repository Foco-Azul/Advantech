import image1 from './images/Screenshot 1.png';
import image2 from './images/Screenshot 2.png';
import image3 from './images/Screenshot 1.png';
import image4 from './images/Screenshot 2.png';

export const images: string[] = [image1.src, image2.src, image3.src, image4.src];

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
