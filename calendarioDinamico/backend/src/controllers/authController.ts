import { Request, Response } from "express"
import User from "../models/User"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {

  try {

    const { name, email, password, age } = req.body

    const user = await User.create({
      name,
      email,
      password,
      age
    })

    res.json(user)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message:"Erro ao registrar usuário"
    })

  }

}

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body

  const user = await User.findOne({ email })

  if(!user || user.password !== password){
    return res.status(401).json({message:"Credenciais inválidas"})
  }

  const secret = process.env.JWT_SECRET

if (!secret) {
  throw new Error("JWT_SECRET não definido")
}

const token = jwt.sign(
  { userId: user._id },
  secret,
  { expiresIn: "7d" }
)

  res.json({
    user,
    token
  })

}