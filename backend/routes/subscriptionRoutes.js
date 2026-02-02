import express from "express";
import {
  addSubscription,
  getSubscriptions
} from "../controllers/subscriptionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addSubscription)
  .get(protect, getSubscriptions);

export default router;
