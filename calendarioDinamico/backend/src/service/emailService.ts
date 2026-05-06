import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER?.trim(),
    pass: process.env.EMAIL_PASS?.trim()
  }
})

export async function sendResetEmail(email: string, token: string){
  const link = `http://localhost:5173/reset-password?token=${token}`

  try {
    await transporter.verify()

    const info = await transporter.sendMail({
      from: `"Calendário" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperação de senha",
      html: `
        <h2>Recuperação de senha</h2>
        <p>Clique no link:</p>
        <a href="${link}">${link}</a>
      `
    })

  } catch (error) {
    console.error("🔥 ERRO AO ENVIAR EMAIL:", error)
    throw error
  }
}