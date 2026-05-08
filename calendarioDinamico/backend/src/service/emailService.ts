import nodemailer from "nodemailer"
import dotenv from "dotenv"
import fs from "fs"

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

export async function sendDailyTasksEmail(
  email: string,
  tasks: any[]
){
  try {

    const tasksHtml = tasks.map(task => `
      <li>
        <strong>${task.description}</strong>
        - ${task.points || 0} pontos
      </li>
    `).join("")

    await transporter.sendMail({
      from: `"Calendário" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "📅 Suas tarefas de hoje",
      html: `
        <h2>Bom dia! ☀️</h2>

        <p>Essas são suas tarefas de hoje:</p>

        <ul>
          ${tasksHtml}
        </ul>

        <p>Boa produtividade 🚀</p>
      `
    })

    console.log(`Email diário enviado para ${email}`)

  } catch(error){
    console.error("Erro ao enviar lembrete diário:", error)
  }
}

export async function sendReportEmail(
  email: string,
  filePath: string,
  type: "weekly" | "monthly" | "yearly"
){

  try {

    console.log("📁 Caminho recebido:", filePath)

    console.log(
      "Arquivo existe?",
      fs.existsSync(filePath)
    )

    const subjects = {
      weekly: "📊 Relatório semanal",
      monthly: "📅 Relatório mensal",
      yearly: "📈 Relatório anual"
    }

    const titles = {
      weekly: "Seu relatório semanal",
      monthly: "Seu relatório mensal",
      yearly: "Seu relatório anual"
    }

    const filenames = {
      weekly: "relatorio-semanal.xlsx",
      monthly: "relatorio-mensal.xlsx",
      yearly: "relatorio-anual.xlsx"
    }

    await transporter.sendMail({

      from: `"Calendário" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: subjects[type],

      html: `
        <h2>${titles[type]}</h2>

        <p>
          O arquivo Excel está anexado 📎
        </p>
      `,

      attachments: [
        {
          filename: filenames[type],
          path: filePath
        }
      ]

    })

    console.log(
      `✅ Relatório ${type} enviado para ${email}`
    )

  } catch(error){

    console.error(
      "❌ Erro ao enviar relatório:",
      error
    )

  }

}

