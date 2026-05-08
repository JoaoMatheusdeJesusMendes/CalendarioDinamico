import cron from "node-cron"

import User from "../models/User"

import {
  generateYearlyReport
} from "./reportService"

import {
  sendReportEmail
} from "./emailService"

export function startYearlyReport(){

  cron.schedule("0 8 1 1 *", async () => {

    console.log(
      "📈 Gerando relatórios anuais"
    )

    const users = await User.find()

    for(const user of users){

      try {

        const filePath =
          await generateYearlyReport(user)

        await sendReportEmail(
          user.email,
          filePath,
          "yearly"
        )

        console.log(
          `✅ Relatório anual enviado para ${user.email}`
        )

      } catch(error){

        console.error(
          `❌ Erro relatório anual ${user.email}:`,
          error
        )

      }

    }

  })

}