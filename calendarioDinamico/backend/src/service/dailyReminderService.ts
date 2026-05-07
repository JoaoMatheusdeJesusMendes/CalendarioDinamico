import cron from "node-cron"
import User from "../models/User"
import Task from "../models/Task"
import { sendDailyTasksEmail } from "./emailService"

export function startDailyReminder(){

  cron.schedule("0 7 * * *", async () => {

    console.log("📅 Enviando lembretes diários")

    const users = await User.find()

    const today = new Date().toISOString().split("T")[0]

    for(const user of users){

      const tasks = await Task.find({
        userId: user._id,
        date: today,
        status: {
          $ne: "done"
        }
      })

      console.log(`Usuário: ${user.email}`)
      console.log(`Tasks encontradas: ${tasks.length}`)

      if(tasks.length === 0){
        continue
      }

      await sendDailyTasksEmail(user.email, tasks)

      console.log("✅ Email enviado")
    }

  })

}