import { Request, Response } from "express";
import { IOrganizationProfile } from "../interface/OrgInterface";
import { createOrganizationProfileSvc, updateOrganizationProfileSvc } from "../service/orgProfileService";
import { ServiceError } from "../utils/ServiceError";





export const createOrganizationProfileController = async (req: Request<{ userId: string }, {}, IOrganizationProfile>, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const profileData = req.body;

    if (!userId) {
        res.status(400).json({ message: 'User ID is required.' });
        return;
    }

    try {
        const profile = await createOrganizationProfileSvc(userId, profileData);
        res.status(201).json({
            success: true,
            message: 'Organization profile created successfully.',
            data: profile
        });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'An error occurred while creating the organization profile.'
            });
        }
    }
};



export const updateOrganizationProfileController = async (req: Request<{ profileId: string, userId: string }, {}, IOrganizationProfile>, res: Response): Promise<void> => {
    const profileId = req.params.profileId
    const userId = req.params.userId;
    const updatedData = req.body;

    try {
        const updatedProfile = await updateOrganizationProfileSvc(profileId, userId, updatedData);
        res.status(200).json({
            success: true,
            message: 'Organization profile updated successfully.',
            data: updatedProfile
        });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'An error occurred while updating the organization profile.'
            });
        }
    }
};