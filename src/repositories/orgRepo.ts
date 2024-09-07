import { postgresDataSource } from "../config/dbConfig";
import { IOrganizationProfile } from "../interface/OrgInterface";
import { OrganizationProfile } from "../models/OrganizationProfile";



export const getOrganizationProfileRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(OrganizationProfile);
}



export const saveOrganizationProfileRepo = async (data: OrganizationProfile): Promise<OrganizationProfile> => {
    const repository = await getOrganizationProfileRepository();
    return repository.save(data);
}

export const updateOrganizationProfileRepo = async (profile: OrganizationProfile): Promise<OrganizationProfile> => {
    const repository = await getOrganizationProfileRepository();
    return repository.save(profile); // Save the fully populated profile entity
};

export const getOrganizationByOrgIdRepo = async (orgId: string): Promise<OrganizationProfile | null> => {
    const repository = await getOrganizationProfileRepository();
    return repository.findOne({
        where: { orgId: orgId }
    });
}

export const getAllOrganizationProfilesRepo = async (): Promise<OrganizationProfile[]> => {
    const repository = await getOrganizationProfileRepository();
    return repository.find();
}

export const getOrgByNameRepo = async (name: string): Promise<OrganizationProfile | null> => {
    const repository = await getOrganizationProfileRepository();
    return repository.findOne({
        where: { organizationName: name }
    });
}



export const deleteOrganizationProfileRepo = async (profileId: string): Promise<void> => {
    const repository = await getOrganizationProfileRepository();
    await repository.delete(profileId);
};