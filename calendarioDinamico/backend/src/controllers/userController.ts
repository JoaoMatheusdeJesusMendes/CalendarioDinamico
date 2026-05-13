import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../models/User"

import { generateUserReport } from "../service/reportService"
import { generateMonthlyReport } from "../service/reportService"
import { generateYearlyReport } from "../service/reportService"
import { sendReportEmail } from "../service/emailService"

import { getPerformanceData } from "../service/performanceService"

export async function getProfile(req: Request, res: Response) {
  const userId = req.user?.userId

  const user = await User.findById(userId).select("-password")

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    })
  }

  res.json(user)
}

export async function updateProfile( req: Request, res: Response) 
{
  const {
    name,
    email,
    age,
    profileImage,
    password
  } = req.body

  const user = await User.findById(
    req.user?.userId
  )

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    })
  }

  if (name) user.name = name
  if (email) user.email = email
  if (age !== undefined) user.age = age
  if (profileImage !== undefined) {
    user.profileImage = profileImage
  }

  if (password && password.trim() !== "") {
    user.password = await bcrypt.hash(password, 10)
  }

  await user.save()

  res.json({
    message: "Perfil atualizado com sucesso"
  })
}

export async function generateReport( req: Request, res: Response) 
{
  try {
    const userId = req.user?.userId
    const { type, date } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado"
      })
    }

    let filePath: string
    let referenceDate: Date | undefined

    if (date) {
      switch (type) {
        case "weekly": {
          const [year, month, day] = date
            .split("-")
            .map(Number)

          referenceDate = new Date(
            year,
            month - 1,
            day
          )
          break
        }

        case "monthly": {
          const [year, month] = date
            .split("-")
            .map(Number)

          referenceDate = new Date(
            year,
            month - 1,
            1
          )
          break
        }

        case "yearly": {
          const year = Number(date)

          referenceDate = new Date(
            year,
            0,
            1
          )
          break
        }
      }
    }

    switch (type) {
      case "weekly":
        filePath = await generateUserReport(
          user,
          referenceDate
        )
        break

      case "monthly":
        filePath = await generateMonthlyReport(
          user,
          referenceDate
        )
        break

      case "yearly":
        filePath = await generateYearlyReport(
          user,
          referenceDate
        )
        break

      default:
        return res.status(400).json({
          message: "Tipo de relatório inválido"
        })
    }

    await sendReportEmail(
      user.email,
      filePath,
      type
    )

    return res.json({
      message:
        "Relatório enviado com sucesso para seu e-mail."
    })
  } catch (error) {
    console.error(
      "Erro ao gerar relatório:",
      error
    )

    return res.status(500).json({
      message:
        "Erro interno ao gerar relatório."
    })
  }
}

export async function getPerformance(
  req: Request,
  res: Response
) {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({
        message: "Usuário não autenticado"
      })
    }

    const type =
      (req.query.type as
        | "weekly"
        | "monthly"
        | "yearly") || "weekly"

    const date =
      req.query.date as string | undefined

    const result = await getPerformanceData(
      userId,
      type,
      date
    )

    return res.json(result)
  } catch (error) {
    console.error(
      "Erro ao buscar desempenho:",
      error
    )

    return res.status(500).json({
      message:
        "Erro interno ao buscar desempenho."
    })
  }
}