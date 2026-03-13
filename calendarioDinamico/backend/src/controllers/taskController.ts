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

export const getTasks = async (req: any, res: Response) => {

  try{

    const tasks = await Task.find({
      userId: req.user.id
    })

    res.json(tasks)

  }catch{

    res.status(500).json({message:"Erro ao buscar tarefas"})

  }

}