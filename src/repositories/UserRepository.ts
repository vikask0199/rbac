import { AppDataSource } from "../config/dbConfig";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/User";


export const getUserRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(User);
};

export const findUserByEmailRepo = async (userEmail: string): Promise<User | null> => {
    const repository = await getUserRepository();
    const result = await repository.findOne({
        where: { userEmail },
        relations: ['roles']
    })
    return result;
};

export const findAllUsersRepo = async (): Promise<User[]> => {
    const repository = await getUserRepository();
    const results = await repository.find()
    return results;
};

export const createUserRepo = async (userData: Partial<User>): Promise<User> => {
    const repository = await getUserRepository();
    const newUser = repository.save(userData)
    return newUser;
};

export const updateUserRepo = async (userData: Partial<User>): Promise<User | null> => {
    const repository = await getUserRepository();
    const updateRecords = await repository.save(userData)
    return updateRecords;
};

export const deleteUserRepo = async (id: string): Promise<boolean> => {
    const repository = await getUserRepository();
    const result = await repository.delete(id);
    return result.affected !== 0;
};