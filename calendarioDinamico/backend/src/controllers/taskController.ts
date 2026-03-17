import { Request, Response } from "express"
import Task from "../models/Task"

export const createTask = async (req: any, res: Response) => {

  try {

    const task = await Task.create({

      ...req.body,

      userId: req.user.userId

    })

    res.json(task)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message:"Erro ao criar tarefa"
    })

  }

}

export const getTasks = async (req: Request, res: Response) => {

  try {

    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" })
    }

    const tasks = await Task.find({
      userId: req.user.userId
    })

    res.json(tasks)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: "Erro ao buscar tarefas"
    })

  }

}

export const updateTask = async (req: Request, res: Response) => {

  try {

    const { id } = req.params

    const updated = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )

    res.json(updated)

  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar tarefa" })
  }

}