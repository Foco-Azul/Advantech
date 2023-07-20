export default function handler(req, res) {
    if (req.method === 'POST') {
      // Lógica para enviar el correo electrónico
      // Utiliza la biblioteca o el servicio que desees para enviar el correo electrónico
      
      res.status(200).json({ message: 'Correo electrónico enviado correctamente.' });
    } else {
      res.status(405).json({ error: 'Método no permitido.' });
    }
  }
  