import cron from "node-cron"
import User from "../models/User"

import { generateUserReport } from "./reportService"
import { sendReportEmail } from "./emailService"

export function startWeeklyReport(){

  cron.schedule("0 8 * * 1", async () => {

    console.log("📊 Gerando relatórios semanais")

    const users = await User.find()

    for(const user of users){

      console.log(`📧 Gerando relatório para ${user.email}`)

      const filePath = await generateUserReport(user)

      await sendReportEmail(
        user.email,
        filePath,
        "weekly"
      )

      console.log("✅ Relatório enviado")

    }

  })

}