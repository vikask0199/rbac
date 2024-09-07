import { DeepPartial } from "typeorm";
import { postgresDataSource } from "../config/dbConfig";
import { IOrganizationDetails } from "../interface/OrgInterface";
import { OrgProfile } from "../models/OrgProfile";



export const getOrgRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(OrgProfile)
}

export const getAllOrgRepo = async ():Promise<OrgProfile []> => {
    const repository = await getOrgRepository();
    return repository.find();
}

export const getOrgByIdRepo = async (id: string): Promise<OrgProfile | null> => {
    const repository = await getOrgRepository();
    return repository.findOne({ where: { orgId: id } });
}


export const createOrgRepo = async (data: IOrganizationDetails): Promise<OrgProfile> => {
    const repository = await getOrgRepository();

    // Create a new OrgProfile entity and map the provided details
    const newOrgProfile = new OrgProfile();
    newOrgProfile.orgName = data.orgName;
    newOrgProfile.address = data.address;
    newOrgProfile.contactNumber = data.contactNumber;

    // Save the organization profile with all the relationships
    return await repository.save(newOrgProfile);
};