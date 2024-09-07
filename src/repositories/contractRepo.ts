import { postgresDataSource } from "../config/dbConfig";
import { Contract } from "../models/Contract";



export const getContractRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(Contract);
}


export const getAllContractRepo = async():Promise<Contract []> =>{
    const contractRepository = await getContractRepository();
    return contractRepository.find();
}


export const getContractByContractIdRepo = async (contractId: string): Promise<Contract | null> => {
    const contractRepository = await getContractRepository();
    return contractRepository.findOne({
        where: { contractId: contractId }
    });
}

export const createContractRepo = async(data: Contract): Promise<Contract> => {
    const contractRepository = await getContractRepository();
    return contractRepository.save(data);
}

