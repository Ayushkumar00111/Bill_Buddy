import express from "express";
import {
  addSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription
} from "../controllers/subscriptionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addSubscription)
  .get(protect, getSubscriptions);

router.put("/:id", protect, updateSubscription);
router.delete("/:id", protect, deleteSubscription);

export default router;
