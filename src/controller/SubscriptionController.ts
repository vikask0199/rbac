import { createSubscriptionSvc } from "../service/subscriptionService";
import { Request, Response } from "express";



export const createSubscriptionController = async(req: Request, res: Response):Promise<void> =>{
    const reqBody = req.body;
    try {
        const createdSubscription = await createSubscriptionSvc(reqBody);
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: createdSubscription,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}