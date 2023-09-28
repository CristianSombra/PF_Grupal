const nodemailer = require('nodemailer');

const enviarCorreo = async (destinatario, asunto, contenidoHtml) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure:false,
      tls: {
        // This allows you to accept self-signed certificates
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail({
      from: 'Tech E-Commerce Henry <ecommercepfhenry@gmail.com>',
      to: destinatario,
      subject: asunto,
      html: contenidoHtml,
    });
    console.log('Correo electrónico enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

module.exports = { enviarCorreo };