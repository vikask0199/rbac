import { IExternalUserRequest } from "../interface/ExternalUserInterface";
import { ExternalUser } from "../models/ExternalUser";
import { createOrgRepo } from "../repositories/externalOrgRepo";
import { getRoleByRoleNameRepo } from "../repositories/externalRoleRepo";
import { getExternalUserByEmail, saveExternalUser } from "../repositories/externalUserRepo";
import { getSubscriptionByIdRepo } from "../repositories/subscriptionPlanRepo";
import { passwordEncode } from "../utils/encodeAndValidatePassword";
import { ServiceError } from "../utils/ServiceError";

export const createExternalUserAccountSvc = async (data: IExternalUserRequest): Promise<ExternalUser> => {
    console.log(data);

    // Validate passwords
    if (data.externalUserPassword !== data.externalUserConfirmPassword) {
        throw new ServiceError('Passwords do not match', 400);
    }

    // Check if the user already exists by email
    const existingUser = await getExternalUserByEmail(data.externalUserEmail);
    if (existingUser) {
        throw new ServiceError('User already exists', 409);
    }

    // Fetch selected plan
    const selectedPlan = await getSubscriptionByIdRepo(data.selectedPlanId);
    if (!selectedPlan) {
        throw new ServiceError('Selected plan does not exist', 404);
    }

    // Hash the password
    const hashedPassword = await passwordEncode(data.externalUserPassword);

    let newUser: ExternalUser;

    // Case 1: Individual user (without organization)
    if (data.isIndividual) {
        const role = await getRoleByRoleNameRepo('Individual Super Admin');
        if (!role) {
            throw new ServiceError('Role does not exist', 404);
        }

        newUser = new ExternalUser();
        newUser.externalUserName = data.externalUserName;
        newUser.externalUserEmail = data.externalUserEmail;
        newUser.externalUserPassword = hashedPassword;
        newUser.role = role;
        newUser.isExternalUserVerified = false;
        newUser.subscriptionPlans = [selectedPlan];

    } else {
        // Validate required fields for non-individual users
        if (!data.orgName || !data.address || !data.contactNumber) {
            throw new ServiceError('Organization details are required for non-individual users', 400);
        }

        const role = await getRoleByRoleNameRepo('Org Super Admin');
        if (!role) {
            throw new ServiceError('Role does not exist', 404);
        }

        // Create the organization
        const newOrgProfile = await createOrgRepo({
            orgName: data.orgName,
            address: data.address,
            contactNumber: data.contactNumber,
        });

        // Create the new user and associate it with the organization
        newUser = new ExternalUser();
        newUser.externalUserName = data.externalUserName;
        newUser.externalUserEmail = data.externalUserEmail;
        newUser.externalUserPassword = hashedPassword;
        newUser.role = role;
        newUser.orgProfile = newOrgProfile;
        newUser.subscriptionPlans = [selectedPlan];
        newUser.isExternalUserVerified = false;
    }

    // Save the user to the database
    return await saveExternalUser(newUser);
};
