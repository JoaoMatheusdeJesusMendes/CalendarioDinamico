import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../models/User"

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

export async function updateProfile(
  req: Request,
  res: Response
) {
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