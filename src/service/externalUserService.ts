import { IExternalUserCreateAccount } from "../interface/ExternalUserInterface";
import { Contract } from "../models/Contract";
import { ExternalUser } from "../models/ExternalUser";
import { createContractRepo } from "../repositories/contractRepo";
import { getExternalUserByIdRepo, saveExternalUserRepo } from "../repositories/extrenalUserRepo";
import { deleteOrganizationProfileRepo } from "../repositories/orgRepo";
import { getSubscriptionByIdRepo } from "../repositories/subscriptionRepo";
import { generateContractId } from "../utils/contract";
import { ServiceError } from "../utils/ServiceError";



export const createUserAccountSvc = async (data: IExternalUserCreateAccount): Promise<ExternalUser> => {

    const existingSubscription = await getSubscriptionByIdRepo(data.subscriptionId)
    if (!existingSubscription) {
        throw new ServiceError("Invalid subscription ID", 404);
    }

    const contractId = generateContractId();
    const newContract = new Contract();
    newContract.contractId = contractId;
    await createContractRepo(newContract)

    const newUser = new ExternalUser();
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.name = data.name;
    newUser.accountType = data.accountType;
    newUser.contract = newContract;


    const savedRecords = await saveExternalUserRepo(newUser)
    return savedRecords;
}




export const updateAccountTypeSvc = async (userId: string, newAccountType: 'individual' | 'organization'): Promise<ExternalUser> => {
    const existingUser = await getExternalUserByIdRepo(userId);
    if (!existingUser) {
        throw new ServiceError('User not found.', 404);
    }

    if (existingUser.accountType === newAccountType) {
        throw new ServiceError('User already has this account type.', 400);
    }

    if (newAccountType === 'organization') {
        if (existingUser.contract.organizationProfile) {
            throw new ServiceError('User is already associated with an organization profile.', 400);
        }

        existingUser.accountType = newAccountType;

    } else if (newAccountType === 'individual') {
        if (existingUser.contract.organizationProfile) {
            await deleteOrganizationProfileRepo(existingUser.contract.organizationProfile.orgId);
            existingUser.contract.organizationProfile = null;
        }

        existingUser.accountType = newAccountType;
    }
    return await saveExternalUserRepo(existingUser);
};
