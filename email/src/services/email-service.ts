import { FastifyReply, FastifyRequest } from 'fastify';
import nodemailer from 'nodemailer';
import { settings } from '../helpers/settings';
import { resetPasswordHtml } from '../templates/reset-password/reset-password-html';
import { usersRepository } from '../repositories/users-repository';

export const emailService = {
  async recoveryPassword(req: FastifyRequest<{ Body: { email: string } }>, reply: FastifyReply): Promise<any> {
    const email = req.body.email;
    const user = await usersRepository.getByEmail(email);
    if (!user) return new Error('Пользователь не найден');

    const recoveryCode = user.emailConfig.recoveryCode;

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

    await transporter.sendMail({
      from: '"Восстановление пароля 👻" <lingma@internet.ru>',
      to: req.body.email,
      subject: 'Восстановление пароля',
      html: resetPasswordHtml(urlRecovery),
    });

    return { email: req.body.email };
  },
};
