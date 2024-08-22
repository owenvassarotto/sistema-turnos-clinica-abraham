import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, emailContent } = await req.json();

    const transporter = nodemailer.createTransport({
      //@ts-ignore
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: 'Sistema de Turnos - Clínica Abraham',
      to,
      subject,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f7f7f7;">
    <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
      <h1 style="color: #333333; font-size: 24px; margin: 0;">Clínica Abraham</h1>
      <h2 style="color: #666666; font-size: 18px; margin: 0;">Sistema de Turnos</h2>
    </header>
    <section style="padding: 20px 0; color: #444444;">
      ${emailContent}
    </section>
    <footer style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd;">
      <p style="color: #888888; font-size: 14px; margin: 0;">
        Clínica Abraham<br>
        Av. España 724 1 B, Mendoza<br>
        Tel: (123) 456-7890
      </p>
      <p style="color: #888888; font-size: 12px; margin-top: 10px;">&copy; 2024 Clínica Abraham. Todos los derechos reservados.</p>
    </footer>
  </div>
`,
    });

    return NextResponse.json({ message: "Email enviado!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error enviando el email." },
      { status: 500 }
    );
  }
}
