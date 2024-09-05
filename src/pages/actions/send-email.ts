import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend('re_SMVWhyv7_FRveD5X7Mp5A97ZhjHmyHuh7');
export async function post({ request }: { request: Request }) {
    try {
      // Ambil data form yang dikirimkan
      const formData = await request.formData();
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;

      // Validasi data form
      if (!email || !message) {
        return new Response(
          JSON.stringify({ error: 'Email and message are required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Kirim email menggunakan Resend
      const { data, error } = await resend.emails.send({
        from: email,
        to: 'thoriqmuh123.alkapro@gmail.com',
        subject: 'New Message from Portfolio',
        html: `<p><strong>Message:</strong> ${message}</p>`,
      });

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to send email', details: error }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: 'Email sent successfully', data }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
