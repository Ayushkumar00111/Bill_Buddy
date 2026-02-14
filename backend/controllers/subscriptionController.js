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
    const subs = await Subscription.find({ user: req.user.id });

    res.json({
      success: true,
      subscriptions: subs, // 🔥 VERY IMPORTANT
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// export const updateSubscription = async (req, res) => {
//   const sub = await Subscription.findById(req.params.id);
//   if (!sub) return res.status(404).json({ message: "Not found" });

//   if (sub.user.toString() !== req.user.id)
//     return res.status(401).json({ message: "Unauthorized" });

//   Object.assign(sub, req.body);
//   await sub.save();

//   res.json({ success: true, subscription: sub });
// };

export const deleteSubscription = async (req, res) => {
  const sub = await Subscription.findById(req.params.id);
  if (!sub) return res.status(404).json({ message: "Not found" });

  await sub.deleteOne();
  res.json({ success: true });
};
//update subcription
export const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
