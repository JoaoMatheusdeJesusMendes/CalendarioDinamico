export type RankName =
  | "Aprendiz"
  | "Iniciante"
  | "Experiente"
  | "Veterano"
  | "Sensei"
  | "Herói"
  | "Estrela"

export const RANKS: {
  name: RankName
  minPoints: number
}[] = [
  { name: "Aprendiz", minPoints: 0 },
  { name: "Iniciante", minPoints: 1000 },
  { name: "Experiente", minPoints: 3000 },
  { name: "Veterano", minPoints: 6000 },
  { name: "Sensei", minPoints: 10000 },
  { name: "Herói", minPoints: 15000 },
  { name: "Estrela", minPoints: 25000 }
]

export function getRank(points: number): RankName {
  let currentRank: RankName = "Aprendiz"

  for (const rank of RANKS) {
    if (points >= rank.minPoints) {
      currentRank = rank.name
    } else {
      break
    }
  }

  return currentRank
}

export function getRankIndex(rankName: RankName): number {
  return RANKS.findIndex(
    rank => rank.name === rankName
  )
}