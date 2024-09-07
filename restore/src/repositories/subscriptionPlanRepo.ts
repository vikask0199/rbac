import { postgresDataSource } from "../config/dbConfig";
import { ISubscriptionPlan } from "../interface/SubscriptionPlanInterface";
import { SubscriptionPlan } from "../models/SubscriptionPlan";



export const getSubscriptionRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(SubscriptionPlan)
}

export const getSubscriptionByNameRepo = async (name: string): Promise<SubscriptionPlan | null> => {
    const repository = await getSubscriptionRepository();
    return repository.findOne({
        where: { planName: name },
        relations: ['externalUser'],
    });
}

export const getAllSubscriptionsRepo = async (): Promise<SubscriptionPlan[]> => {
    const repository = await getSubscriptionRepository();
    return repository.find();
}

export const getSubscriptionByIdRepo = async (id: string): Promise<SubscriptionPlan | null> => {
    const repository = await getSubscriptionRepository();
    return repository.findOne({
        where: { planId: id },
        relations: ['externalUser'],
    })
}

export const createSubscriptionPlan = async (data: ISubscriptionPlan): Promise<SubscriptionPlan> => {
    const repository = await getSubscriptionRepository();
    return await repository.save(data);
}