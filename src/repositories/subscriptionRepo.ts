import { postgresDataSource } from "../config/dbConfig"
import { Subscription } from "../models/Subscription";



export const getSubscriptionRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(Subscription);
}


export const createSubscriptionRepo = async (planData: Subscription): Promise<Subscription> => {
    const repository = await getSubscriptionRepository();
    return repository.save(planData);
};

export const getAllSubscriptionRepo = async (): Promise<Subscription[]> => {
    const repository = await getSubscriptionRepository();
    return repository.find();
};

export const getSubscriptionByNameRepo = async (name: string): Promise<Subscription | null> => {
    const repository = await getSubscriptionRepository();
    return repository.findOne({ where: { planName: name } });
};


export const getSubscriptionByIdRepo = async (id: string): Promise<Subscription | null> =>{
    const repository = await getSubscriptionRepository();
    return repository.findOne({
        where: { subId: id },
    });
}