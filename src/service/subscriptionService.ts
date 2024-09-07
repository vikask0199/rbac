import { ISubscription } from "../interface/SubscriptionInterface";
import { Subscription } from "../models/Subscription";
import { createSubscriptionRepo, getAllSubscriptionRepo, getSubscriptionByNameRepo } from "../repositories/subscriptionRepo";
import { ServiceError } from "../utils/ServiceError";



export const createSubscriptionSvc = async (subscription: ISubscription): Promise<Subscription> => {
    const existingSubscription = await getSubscriptionByNameRepo(subscription.planName)
    if (existingSubscription) {
        throw new ServiceError("Subscription plan already exists", 409);
    }

    const newSubscription = new Subscription()
    newSubscription.planName = subscription.planName
    newSubscription.price = subscription.price
    newSubscription.isActive = subscription.isActive
    newSubscription.validity = subscription.validity
    newSubscription.viewerLimit = subscription.viewerLimit
    newSubscription.validTill = subscription.validTill

    return await createSubscriptionRepo(newSubscription);
}


export const getAllSubscriptionsSvc = async (): Promise<Subscription[]> => {
    const data = await getAllSubscriptionRepo();
    return data;
}


export const getSubscriptionByIdSvc = async (subId: string): Promise<Subscription> => {
    const data = await getSubscriptionByNameRepo(subId);
    if (!data) {
        throw new ServiceError("Subscription not found", 404);
    }
    return data;
}

export const getSubscriptionByNameSvc = async (name: string): Promise<Subscription> => {
    const data = await getSubscriptionByNameRepo(name);
    if (!data) {
        throw new ServiceError("Subscription not found", 404);
    }
    return data;
}