/*Para esta clase me he ayudado de IA*/
/* He utilizado EmailJS para el envio de correos sin necesitar un servido*/

import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import type { ReservationEmail } from '../models/reservation';

import { EMAILJS_CONFIG } from './emailjs-config';


@Injectable({
  providedIn: 'root',
})
export class EmailService {
  sendReservationConfirmation(reservation: ReservationEmail): Promise<unknown> {
    const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;

    if (
      serviceId === 'YOUR_EMAILJS_SERVICE_ID' ||
      templateId === 'YOUR_EMAILJS_TEMPLATE_ID' ||
      publicKey === 'YOUR_EMAILJS_PUBLIC_KEY'
    ) {
      return Promise.reject(
        new Error('Configura las credenciales de EmailJS antes de enviar reservas.'),
      );
    }

    return emailjs.send(
      serviceId,
      templateId,
      {
        to_email: reservation.email,
        customer_name: reservation.nombre,
        reservation_date: reservation.fecha,
        reservation_time: reservation.hora,
        guests: reservation.personas,
        phone: reservation.telefono,
        reply_to: reservation.email,
        restaurant_name: 'Rouge de Minuit',
      },
      { publicKey },
    );
  }
}
