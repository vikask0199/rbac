import { Request, Response } from "express";
import { IExternalUserCreateAccount } from "../interface/ExternalUserInterface";
import { createUserAccountSvc, updateAccountTypeSvc } from "../service/externalUserService";
import { ServiceError } from "../utils/ServiceError";


export const createUserAccountController = async (req: Request<{},{}, IExternalUserCreateAccount>, res: Response): Promise<void> => {
  const { email, password, name, accountType, subscriptionId } = req.body;

  if (!email || !password || !name || !accountType || !subscriptionId) {
    res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const savedRecords = await createUserAccountSvc(req.body)
    res.status(201).json({
      success: true,
      message: "User account created successfully",
      data: savedRecords,
    });
  } catch (error: any) {
    if (error instanceof ServiceError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the user account",
      });
    }
  }
}




export const updateAccountTypeController = async (req: Request<{ userId: string }, {}, IExternalUserCreateAccount>, res: Response): Promise<void> => {
  const userId = req.params.userId;
  const { accountType } = req.body;

  if (!userId || !accountType) {
    res.status(400).json({ message: 'User ID and account type are required.' });
    return;
  }

  try {
    const updatedUser = await updateAccountTypeSvc(userId, accountType);
    res.status(200).json({
      success: true,
      message: 'Account type updated successfully.',
      data: updatedUser
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
        message: error.message
      });
    }
  }
};



