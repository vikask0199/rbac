import { Request, Response } from "express"
import { ISubscriptionPlan } from "../interface/SubscriptionPlanInterface"
import { ServiceError } from "../utils/ServiceError"
import { createSubscriptionPlanSvc } from "../service/subscriptionPlanService"






// export const upgradeUserPlan = async (userId: string, newPlanName: string) => {
//     const userRepository = getRepository(User);
//     const userPlanRepository = getRepository(UserPlan);
//     const planHistoryRepository = getRepository(PlanHistory);
  
//     // Fetch user
//     const user = await userRepository.findOne({ where: { userId }, relations: ['userPlans'] });
//     if (!user) throw new ServiceError('User not found', 404);
  
//     // Fetch new plan details from MongoDB
//     const newPlan = await fetchPlanFromMongo(newPlanName);
//     if (!newPlan) throw new ServiceError('Plan not found', 404);
  
//     // Deactivate current active plan
//     const currentPlan = user.userPlans.find(plan => plan.isActive);
//     if (currentPlan) {
//       currentPlan.isActive = false;
//       currentPlan.endDate = new Date();
//       await userPlanRepository.save(currentPlan);
//     }
  
//     // Save current plan details to history
//     if (currentPlan) {
//       const planHistory = new PlanHistory();
//       planHistory.user = user;
//       planHistory.planName = currentPlan.planName;
//       planHistory.features = currentPlan.features;
//       planHistory.price = currentPlan.price;
//       planHistory.durationInMonths = currentPlan.durationInMonths;
//       planHistory.isActive = false;
//       await planHistoryRepository.save(planHistory);
//     }
  
//     // Create new plan instance for the user
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