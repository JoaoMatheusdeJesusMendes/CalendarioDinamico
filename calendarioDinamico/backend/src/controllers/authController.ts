import { Request, Response } from "express"
import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

export const register = async (req: Request, res: Response) => {

  try {

    const { name, email, password, age } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "Email já está em uso"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      isVerified: false
    })

    const verifyToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    const verifyLink = `http://localhost:3000/auth/verify/${verifyToken}`

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifique sua conta",
      html: `<a href="${verifyLink}">Verificar conta</a>`
    })

    res.json({
      message: "Usuário criado. Verifique seu email."
    })

  } catch (error) {

    res.status(500).json({
      message: "Erro ao registrar usuário"
    })

  }

}

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body as { email?: string; password?: string }

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({
      message: "Usuário não encontrado"
    })
  }

  if (!password) {
    return res.status(400).json({
      message: "Senha é obrigatória"
    })
  }

  const storedPassword = user.password
  if (!storedPassword) {
    return res.status(400).json({
      message: "Senha inválida"
    })
  }

  const isMatch = await bcrypt.compare(password, storedPassword)

  if (!isMatch) {
    return res.status(400).json({
      message: "Senha inválida"
    })
  }

  if (!user.isVerified) {
    return res.status(401).json({
      message: "Verifique seu email antes de entrar"
    })
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  )

  res.json({ token })
}

export const verifyEmail = async (req: Request, res: Response) => {

  try {

    const { token } = req.params

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as any

    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).send("Usuário não encontrado")
    }

    user.isVerified = true
    await user.save()

    return res.send("Conta verificada com sucesso! ✅")

  } catch (error) {

    return res.status(400).send("Token inválido ou expirado ❌")

  }

}