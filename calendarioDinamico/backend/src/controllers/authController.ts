import { Request, Response } from "express"
import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {

  try {

    const { name, email, password, age } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age
    })

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    res.json({ token })
    
  } catch (error) {

    res.status(500).json({
      message:"Erro ao registrar usuário"
    })

  }

}

export const login = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || !user.password) {
      return res.status(401).json({
        message: "Usuário ou senha inválidos"
      })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({
        message: "Usuário ou senha inválidos"
      })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: "Erro no login"
    })

  }

}