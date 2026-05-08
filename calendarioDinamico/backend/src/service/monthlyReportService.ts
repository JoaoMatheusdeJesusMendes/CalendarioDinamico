import cron from "node-cron"
import User from "../models/User"

import { generateMonthlyReport } from "./reportService"
import { sendReportEmail } from "./emailService"

export function startMonthlyReport(){

  cron.schedule("0 8 1 * *", async () => {

    console.log("📊 Gerando relatórios mensais")

    try {

      const users = await User.find()

      for(const user of users){

        try {

          console.log(
            `📧 Gerando relatório mensal para ${user.email}`
          )

          const filePath =
            await generateMonthlyReport(user)

          await sendReportEmail(
            user.email,
            filePath,
            "monthly"
          )

          console.log(
            `✅ Relatório mensal enviado para ${user.email}`
          )

        } catch(error){

          console.error(
            `❌ Erro ao gerar relatório de ${user.email}:`,
            error
          )

        }

      }

    } catch(error){

      console.error(
        "❌ Erro no relatório mensal:",
        error
      )

    }

  })

}