import express from "express";
import { externalSubscriptionController, getAllSubscriptionController } from "../controller/subscriptionController";

const router = express.Router();

router.post('/createSubscription', externalSubscriptionController)
router.get('/getAllSubscription', getAllSubscriptionController)

export default router