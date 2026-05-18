import Task from "../models/Task"
import User from "../models/User"
import { RANKS, getRank, getRankIndex } from "../utils/rankUtils"

export async function getRankingData(userId: string) {
  const today = new Date()

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  )

  const endOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  )

  const completedTasks = await Task.find({
    userId,
    status: "done",
    completedAt: {
      $gte: startOfMonth,
      $lt: endOfMonth
    }
  })

  const seasonPoints = completedTasks.reduce(
    (sum, task) => sum + (task.points || 0),
    0
  )

  const currentRank = getRank(seasonPoints)

  const user = await User.findById(userId)

  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  const currentRankIndex = getRankIndex(currentRank)
  const highestRankIndex = getRankIndex(
    user.highestRank || "Aprendiz"
  )

  if (currentRankIndex > highestRankIndex) {
    user.highestRank = currentRank
    await user.save()
  }

  const users = await User.find()

  const rankingUsers: Array<{
    userId: string
    name: string
    profileImage?: string
    points: number
    rank: string
  }> = []

  for (const otherUser of users) {
    const tasks = await Task.find({
      userId: otherUser._id,
      status: "done",
      completedAt: {
        $gte: startOfMonth,
        $lt: endOfMonth
      }
    })

    const points = tasks.reduce(
      (sum, task) => sum + (task.points || 0),
      0
    )

    const rank = getRank(points)

    if (rank === currentRank) {
      rankingUsers.push({
        userId: otherUser._id.toString(),
        name: otherUser.name,
        profileImage: otherUser.profileImage,
        points,
        rank
      })
    }
  }

  rankingUsers.sort((a, b) => b.points - a.points)

  const top10 = rankingUsers.slice(0, 10)

  return {
    seasonPoints,
    currentRank,
    highestRank: user.highestRank,
    nextRank:
      RANKS[currentRankIndex + 1]?.name || null,
    pointsToNextRank:
      RANKS[currentRankIndex + 1]
        ? RANKS[currentRankIndex + 1].minPoints -
          seasonPoints
        : 0,
    top10
  }
}