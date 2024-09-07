import { Request, Response } from "express";
import { ISubscriptionPlan } from "../interface/SubscriptionPlanInterface";
import { createSubscriptionPlanSvc, getAllSubscriptions } from "../service/subscriptionPlanService";
import { ServiceError } from "../utils/ServiceError";



export const externalSubscriptionController = async (req: Request<{}, {}, ISubscriptionPlan>, res: Response): Promise<void> => {
    const reqBody = req.body
    try {
        const createdSubscription = await createSubscriptionPlanSvc(reqBody)
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: createdSubscription,
        });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}


export const getAllSubscriptionController = async (req: Request, res: Response): Promise<void> => {
    try {
        const allSubscriptions = await getAllSubscriptions()
        res.status(200).json({
            success: true,
            message: "All subscriptions retrieved successfully",
            data: allSubscriptions,
        });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}