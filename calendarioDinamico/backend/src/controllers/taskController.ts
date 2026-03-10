import { Request, Response } from "express"
import Task from "../models/Task"

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" })
  }
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" })
  }
}