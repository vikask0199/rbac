import { IContinueWithGoogle, ILoginUser } from "../interface/ExternalUserInterface";
import { IJwtResponse } from "../interface/JwtInterface";
import { ExternalUser } from "../models/ExternalUser";
// import { getRouteByName } from "../repositories/externalRouteRepository";
import { getExternalUserByEmail, saveExternalUser } from "../repositories/externalUserRepo";
import { validatePassword } from "../utils/encodeAndValidatePassword";
import { validateGoogleId } from "../utils/googleTokenValidator";
import { generateJwtTokenSvc } from "../utils/jwtService";
import { ServiceError } from "../utils/ServiceError";
import jwt from "jsonwebtoken";



export const loginExternalUserSvc = async (user: ILoginUser): Promise<IJwtResponse> => {
    if (!user.userEmail || !user.userPassword) {
        throw new ServiceError('Please Provide a valid email and password', 400);
    }

    const existingUser = await getExternalUserByEmail(user.userEmail);

    if (!existingUser) {
        throw new ServiceError('Invalid credentials', 401);
    }

    if(!existingUser.externalUserPassword){
        throw new ServiceError('User password is not set please reset password', 400);
    }

    const isPasswordValid = await validatePassword(user.userPassword, existingUser.externalUserPassword);
    if (!isPasswordValid) {
        throw new ServiceError('Invalid credentials', 401);
    }

    const payLoadToGenerateJwtToken = {
        email: existingUser.externalUserEmail,
        userType: existingUser.role.externalRoleName,
    };

    return await generateJwtTokenSvc(payLoadToGenerateJwtToken);
}


// export const continueWithGoogleSvc = async (googleToken: IContinueWithGoogle): Promise<IJwtResponse> => {
    // if (!googleToken || !googleToken.token) {
    //     throw new ServiceError('Invalid Google token', 404);
    // }

    // const decodedToken = jwt.decode(googleToken.token);

    // if (typeof decodedToken === 'object' && decodedToken !== null) {
    //     if (!decodedToken.email_verified || !decodedToken.email) {
    //         throw new ServiceError('Google email not verified', 403);
    //     }

    //     const existingUser = await getExternalUserByEmail(decodedToken.email);

    //     if (existingUser) {
    //         if (existingUser.externalUserGoogleProfileId && decodedToken.sub) {
    //             const isMatched = await validateGoogleId(decodedToken.sub, existingUser.externalUserGoogleProfileId);
    //             if (!isMatched) {
    //                 throw new ServiceError('Google ID does not match with the existing user', 403);
    //             }
    //         } else {
    //             existingUser.externalUserGoogleProfileId = decodedToken.sub || '';
    //             existingUser.isExternalUserVerified = true;
    //             await saveExternalUser(existingUser);
    //         }

    //         const payLoadToGenerateJwtToken = {
    //             email: existingUser.externalUserEmail,
    //             userType: existingUser.role.externalRoleName,
    //         };

    //         return await generateJwtTokenSvc(payLoadToGenerateJwtToken);
    //     } else {
    //         // const defaultRole = await getRouteByName('SuperAdmin');
    //         const externalUser = new ExternalUser();
    //         externalUser.externalUserName = decodedToken.given_name;
    //         externalUser.externalUserEmail = decodedToken.email;
    //         externalUser.externalUserGoogleProfileId = decodedToken.sub || '';
    //         // externalUser.role = defaultRole;
    //         externalUser.isExternalUserVerified = true;

    //         await saveExternalUser(externalUser);

    //         const payLoadToGenerateJwtToken = {
    //             email: externalUser.externalUserEmail,
    //             userType: externalUser.role.externalRoleName,
    //         };

    //         return await generateJwtTokenSvc(payLoadToGenerateJwtToken);
    //     }
    // } else {
    //     throw new ServiceError('Invalid Google token payload', 404);
    // }
// }