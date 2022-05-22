import { FastifyReply, FastifyRequest } from 'fastify';
import nodemailer from 'nodemailer';
import { settings } from '../helpers/settings';
import { resetPasswordHtml } from '../templates/reset-password/reset-password-html';

export const emailService = {
  async recoveryPassword(
    req: FastifyRequest<{ Body: { email: string; recoveryCode: string } }>,
    reply: FastifyReply
  ): Promise<any> {
    const email = req.body.email;
    const recoveryCode = req.body.recoveryCode;

    let transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: settings.NODEMAILER_EMAIL,
        pass: settings.NODEMAILER_PASS,
      },
    });

    const urlRecovery = `${settings.FRONT_URL}${recoveryCode}`;

    try {
      await transporter.sendMail({
        from: '"Восстановление пароля 👻" <lingma@internet.ru>',
        to: email,
        subject: 'Восстановление пароля',
        html: resetPasswordHtml(urlRecovery),
      });
      reply.code(200).send('OK');
    } catch (e) {
      return new Error('message not sent');
    }
  },
};
