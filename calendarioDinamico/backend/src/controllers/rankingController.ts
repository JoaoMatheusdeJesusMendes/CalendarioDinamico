import { Request, Response } from "express"
import { getRankingData } from "../service/rankingService"

export const getRanking = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Não autenticado" })
    }

    const ranking = await getRankingData(
      req.user.userId
    )

    res.json(ranking)
  } catch (error) {
    console.error("Erro ao obter ranking:", error)

    res.status(500).json({
      message: "Erro ao obter ranking"
    })
  }
}