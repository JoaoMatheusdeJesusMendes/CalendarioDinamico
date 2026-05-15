import { Request, Response } from "express"
import Task from "../models/Task"

export const createTask = async (req: Request, res: Response) => {

  try {

    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" })
    }

    const task = await Task.create({
      ...req.body,
      userId: req.user.userId
    })

    res.json(task)

  } catch (error) {

    res.status(500).json({
      message:"Erro ao criar tarefa"
    })

  }

}

export const getTasks = async (req: Request, res: Response) => {

  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado" })
  }

  const tasks = await Task.find({
    userId: req.user.userId
  })

  res.json(tasks)
}

export const getTaskById = async (req: Request, res: Response) => {

  try {

    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" })
    }

    const { id } = req.params

    const task = await Task.findOne({
      _id: id,
      userId: req.user.userId
    })

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" })
    }

    res.json(task)

  } catch (error) {

    res.status(500).json({ message: "Erro ao buscar tarefa" })

  }

}

export const updateTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Não autenticado"
      })
    }

    const { id } = req.params

    const existingTask = await Task.findOne({
      _id: id,
      userId: req.user.userId
    })

    if (!existingTask) {
      return res.status(404).json({
        message: "Tarefa não encontrada"
      })
    }

    const updateData = { ...req.body }

    if (
      updateData.status === "done" &&
      existingTask.status !== "done" &&
      !existingTask.completedAt
    ) {
      updateData.completedAt = new Date()
    }

    if (
      updateData.status &&
      updateData.status !== "done"
    ) {
      updateData.completedAt = undefined
    }

    const updated = await Task.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.userId
      },
      updateData,
      {
        new: true,
        runValidators: true
      }
    )

    if (!updated) {
      return res.status(404).json({
        message: "Tarefa não encontrada"
      })
    }

    res.json(updated)
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error)

    res.status(500).json({
      message: "Erro ao atualizar tarefa"
    })
  }
}