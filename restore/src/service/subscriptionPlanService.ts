import { ISubscriptionPlan } from "../interface/SubscriptionPlanInterface";
import { SubscriptionPlan } from "../models/SubscriptionPlan";
import { createSubscriptionPlan, getAllSubscriptionsRepo, getSubscriptionByNameRepo } from "../repositories/subscriptionPlanRepo";
import { ServiceError } from "../utils/ServiceError";


export const createSubscriptionPlanSvc = async (data: ISubscriptionPlan): Promise<SubscriptionPlan> => {
    const existingSubscriptionPlan = await getSubscriptionByNameRepo(data.planName)
    if (existingSubscriptionPlan) {
        throw new ServiceError("Plan already exists", 409)
    }
    const subscriptionPlan = new SubscriptionPlan()
    subscriptionPlan.planName = data.planName
    subscriptionPlan.pricing = data.pricing
    subscriptionPlan.features = data.features
    subscriptionPlan.numberOfCredits = data.numberOfCredits
    subscriptionPlan.durationInMonths = data.durationInMonths
    subscriptionPlan.isPlanActive = data.isPlanActive
    
    const savePlan = await createSubscriptionPlan(data)

    return savePlan;
}


export const updateSubscriptionPlanSvc = async (data: ISubscriptionPlan): Promise<SubscriptionPlan> => {
    const existingSubscriptionPlan = await getSubscriptionByNameRepo(data.planName)
    if (!existingSubscriptionPlan) {
        throw new ServiceError("Plan does not exist", 404)
    }
    existingSubscriptionPlan.pricing = data.pricing
    existingSubscriptionPlan.features = data.features
    existingSubscriptionPlan.numberOfCredits = data.numberOfCredits
    existingSubscriptionPlan.durationInMonths = data.durationInMonths
    existingSubscriptionPlan.isPlanActive = data.isPlanActive

    const updatedPlan = await createSubscriptionPlan(existingSubscriptionPlan)

    return updatedPlan;
}



export const getAllSubscriptions = async (): Promise<SubscriptionPlan []> =>{
    const allPlans = await getAllSubscriptionsRepo()
    return allPlans;
}