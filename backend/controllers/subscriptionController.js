import Subscription from "../models/Subscription.js";

// AUTO STATUS FUNCTION
const getStatus = (startDate, endDate) => {
  const today = new Date();

  if (today < new Date(startDate)) return "unused";
  if (today > new Date(endDate)) return "expired";
  return "active";
};

// ADD SUBSCRIPTION
export const addSubscription = async (req, res) => {
  try {
    const { name, price, startDate, endDate } = req.body;

    if (!name || !price || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields required" });
    }

    const status = getStatus(startDate, endDate);

    const subscription = await Subscription.create({
      user: req.user._id,
      name,
      price,
      startDate,
      endDate,
      status
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USER SUBSCRIPTIONS
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
