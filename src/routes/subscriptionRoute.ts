import express from 'express';
import { createSubscriptionController } from '../controller/SubscriptionController';

const router = express.Router();

router.post('/createSubscription', createSubscriptionController)


export default router;