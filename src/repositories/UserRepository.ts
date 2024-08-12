import { AppDataSource } from "../config/dbConfig";
import { User } from "../models/User";


export const getUserRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(User);
};

export const findUserById = async (id: string): Promise<User | null> => {
    const repository = await getUserRepository();
    return await repository.findOne({ where: { id }, relations: ['roles', 'superAdmin'] });
};

export const findAllUsers = async (): Promise<User[]> => {
    const repository = await getUserRepository();
    return await repository.find({ relations: ['roles', 'superAdmin'] });
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
    const repository = await getUserRepository();
    const user = repository.create(userData);
    return await repository.save(user);
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
    const repository = await getUserRepository();
    await repository.update(id, userData);
    return await findUserById(id);
};

export const deleteUser = async (id: string): Promise<boolean> => {
    const repository = await getUserRepository();
    const result = await repository.delete(id);
    return result.affected !== 0;
};