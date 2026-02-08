import cron from "node-cron";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

cron.schedule("0 9 * * *", async () => {
  console.log("⏰ Running subscription reminder job");

  const today = new Date();

  const upcomingSubs = await Subscription.find({
    endDate: {
      $gte: today,
      $lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
  }).populate("user");

  for (const sub of upcomingSubs) {
    const user = sub.user;

    await sendEmail(
      user.email,
      "⏰ Subscription Expiring Soon",
      `
        <h3>Hello ${user.name}</h3>
        <p>Your subscription <b>${sub.name}</b> is expiring on
        <b>${new Date(sub.endDate).toDateString()}</b>.</p>
        <p>Please renew or cancel to avoid charges.</p>
        <br/>
        <small>— BillBuddy Team</small>
      `
    );
  }
});
