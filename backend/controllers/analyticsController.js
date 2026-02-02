import Subscription from "../models/Subscription.js";

// DASHBOARD ANALYTICS
export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const subscriptions = await Subscription.find({ user: userId });

    let totalSpent = 0;
    let wastedMoney = 0;
    let activeCount = 0;
    let expiredCount = 0;
    let unusedCount = 0;

    subscriptions.forEach((sub) => {
      totalSpent += sub.price;

      if (sub.status === "expired") {
        expiredCount++;
        wastedMoney += sub.price;
      }

      if (sub.status === "active") activeCount++;
      if (sub.status === "unused") unusedCount++;
    });

    res.json({
      totalSubscriptions: subscriptions.length,
      totalSpent,
      wastedMoney,
      activeCount,
      expiredCount,
      unusedCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
