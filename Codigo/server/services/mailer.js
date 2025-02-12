import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medsyncmailer@gmail.com',
        pass: 'gqvg iguj spbj lltk'
    }
});

export async function sendEmail(to, key) {
    const resetLink = `http://localhost:3000/recovery-password/${key}`;
    try {
        // TODO: Alterar valores estáticos para valores de env var
        const mailOptions = {
            from: '"MedSync" <medsyncmailer@gmail.com>',
            to: to,
            subject: 'Redefinir senha',
            html: `<div style="border: 1px solid black; padding: 20px; width: 500px; max-width: 100%; margin: 0 auto; text-align: center;">
  <h2 style="margin-bottom: 20px;">Redefinir senha</h2>
  <p style="margin: 0 20px 20px 20px; text-align: center;">Para redefinir sua senha clique no botão abaixo para ser redirecionado para a plataforma MedSync</p>
  <a href="${resetLink}" style="display: inline-block; width: 200px; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; margin-bottom: 20px;">Redefinir senha</a>
</div>`
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

