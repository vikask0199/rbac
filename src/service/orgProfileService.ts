import { IOrganizationProfile } from "../interface/OrgInterface";
import { OrganizationProfile } from "../models/OrganizationProfile";
import { getExternalUserByIdRepo } from "../repositories/extrenalUserRepo";
import { getOrganizationByOrgIdRepo, saveOrganizationProfileRepo, updateOrganizationProfileRepo } from "../repositories/orgRepo";
import { ServiceError } from "../utils/ServiceError";


export const createOrganizationProfileSvc = async (userId: string, profileData: IOrganizationProfile): Promise<OrganizationProfile> => {
    if (!userId) {
        throw new ServiceError('User ID is required.', 400);
    }
    const existingUser = await getExternalUserByIdRepo(userId)
    if (!existingUser) {
        throw new ServiceError('User not found.', 404);
    }

    if(existingUser.contract.organizationProfile?.orgId){
        throw new ServiceError('User already has an organization profile.', 400);
    }

    if (!existingUser || existingUser.accountType !== 'organization') {
        throw new ServiceError('Account type must be organization to create an organization profile.', 400);
    }

    const organizationProfile = new OrganizationProfile();
    organizationProfile.organizationName = profileData.organizationName;
    organizationProfile.address = profileData.address;
    organizationProfile.contract = existingUser.contract;

    return await saveOrganizationProfileRepo(organizationProfile);

};





export const updateOrganizationProfileSvc = async (profileId: string, userId: string, updatedData: Partial<IOrganizationProfile>): Promise<OrganizationProfile> => {
    // Retrieve the existing profile
    const existingProfile = await getOrganizationByOrgIdRepo(profileId);
    if (!existingProfile) {
        throw new ServiceError('Organization profile not found.', 404);
    }
    
    // Check for conflicts in updated data
    if (updatedData.organizationName && updatedData.organizationName === existingProfile.organizationName) {
        throw new ServiceError('Organization name cannot be the same as the existing one.', 400);
    }
    if (updatedData.address && updatedData.address === existingProfile.address) {
        throw new ServiceError('Organization address cannot be the same as the existing one.', 400);
    }
    
    // Retrieve the existing user
    const existingUser = await getExternalUserByIdRepo(userId);
    if (!existingUser) {
        throw new ServiceError('User not found. Please check your details or login again.', 404);
    }

    // Check if user has the correct account type and authorization
    if (existingUser.accountType !== 'organization') {
        throw new ServiceError('Account type must be organization to update an organization profile.', 400);
    }
    if (existingUser.contract.organizationProfile?.orgId !== profileId) {
        throw new ServiceError('You are not authorized to update this organization profile.', 403);
    }
    
    // Apply updates to the existing profile
    Object.assign(existingProfile, updatedData);

    // Save updated profile
    return await updateOrganizationProfileRepo(existingProfile);
};
