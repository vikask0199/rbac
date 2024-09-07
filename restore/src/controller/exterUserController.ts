import { Request, Response } from "express";
import { IExternalUserRequest } from "../interface/ExternalUserInterface";
import { createExternalUserAccountSvc } from "../service/externalUserService";
import { ServiceError } from "../utils/ServiceError";


export const externalUserController = async (req: Request<{}, {}, IExternalUserRequest>, res: Response) => {
    const reqBody = req.body;
    try {
        const data = await createExternalUserAccountSvc(reqBody)
        res.status(201).json({
            success: true,
            message: "User Created successfully",
            data: data,
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
                message: error.message,
            });
        }
    }
}



// export const updateUser = async (
//     userId: string, 
//     updateData: IUserUpdate
//   ): Promise<IUser> => {
//     // Retrieve user from the database
//     const user = await getUserById(userId);
    
//     // Update fields if they exist in updateData
//     if (updateData.username) user.username = updateData.username;
//     if (updateData.userEmail) user.userEmail = updateData.userEmail;
//     if (updateData.password) user.password = updateData.password;
//     if (updateData.roleId) user.role = await getRoleById(updateData.roleId);
//     if (updateData.organizationId !== undefined) {
//       user.organization = updateData.organizationId ? await getOrganizationById(updateData.organizationId) : null;
//     }
  
//     user.updatedAt = new Date();
  
//     // Save the updated user back to the database
//     return await saveUser(user);
//   };
  
//   export const updateUserPlan = async (
//     userPlanId: string, 
//     updateData: IUserPlanUpdate
//   ): Promise<IUserPlan> => {
//     // Retrieve user plan from the database
//     const userPlan = await getUserPlanById(userPlanId);
  
//     // Update fields if they exist in updateData
//     if (updateData.planName) userPlan.planName = updateData.planName;
//     if (updateData.features) userPlan.features = updateData.features;
//     if (updateData.price) userPlan.price = updateData.price;
//     if (updateData.durationInMonths) userPlan.durationInMonths = updateData.durationInMonths;
//     if (updateData.isActive !== undefined) userPlan.isActive = updateData.isActive;
//     if (updateData.endDate !== undefined) userPlan.endDate = updateData.endDate;
  
//     userPlan.updatedAt = new Date();
  
//     // Save the updated user plan back to the database
//     return await saveUserPlan(userPlan);
//   };



// export const signupController = async (req: Request, res: Response) => {
//     const { email, password, planId } = req.body;
    
//     try {
//       // Check if user already exists
//       const existingUser = await findUserByEmail(email);
//       if (existingUser) {
//         throw new ServiceError('User already exists', 409);
//       }
  
//       // Fetch role based on the plan
//       const role = await findRoleByName('SuperAdmin');
  
//       // Create new user
//       const newUser = new User();
//       newUser.email = email;
//       newUser.password = password; // Hash password before saving
//       newUser.role = role;
//       await createUser(newUser);
  
//       // Send OTP for email verification
//       await sendOTP(email);
  
//       res.status(201).json({
//         success: true,
//         message: 'User created successfully. OTP sent to email for verification.',
//       });
//     } catch (error) {
//       res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };





// export const updateUserActivePlan = async (userId: string, newPlanName: string) => {
//     const userRepository = getRepository(User);
//     const userPlanRepository = getRepository(UserPlan);
//     const planHistoryRepository = getRepository(PlanHistory);
  
//     // Fetch user
//     const user = await userRepository.findOne({ where: { userId }, relations: ['userPlans'] });
//     if (!user) throw new ServiceError('User not found', 404);
  
//     // Fetch new plan details from MongoDB
//     const newPlan = await fetchPlanFromMongo(newPlanName);
//     if (!newPlan) throw new ServiceError('Plan not found', 404);
  
//     // Fetch the user's current active plan
//     const currentActivePlan = user.userPlans.find(plan => plan.isActive);
//     if (currentActivePlan) {
//       // Deactivate the current active plan
//       currentActivePlan.isActive = false;
//       currentActivePlan.endDate = new Date();
//       await userPlanRepository.save(currentActivePlan);
  
//       // Save the current plan details to the history
//       const planHistory = new PlanHistory();
//       planHistory.user = user;
//       planHistory.planName = currentActivePlan.planName;
//       planHistory.features = currentActivePlan.features;
//       planHistory.price = currentActivePlan.price;
//       planHistory.durationInMonths = currentActivePlan.durationInMonths;
//       planHistory.isActive = false;
//       planHistory.createdAt = currentActivePlan.startDate;
//       await planHistoryRepository.save(planHistory);
//     }
  
//     // Create a new active plan for the user
//     const userPlan = new UserPlan();
//     userPlan.user = user;
//     userPlan.planName = newPlan.planName;
//     userPlan.features = newPlan.features;
//     userPlan.price = newPlan.price;
//     userPlan.durationInMonths = newPlan.durationInMonths;
//     userPlan.isActive = true;
//     userPlan.startDate = new Date();
  
//     await userPlanRepository.save(userPlan);
    
//     return userPlan;
//   };





