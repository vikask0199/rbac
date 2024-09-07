import { Request, Response } from "express"
import { ServiceError } from "../utils/ServiceError";
import { IContinueWithGoogle, ILoginUser } from "../interface/ExternalUserInterface";
import { loginExternalUserSvc } from "../service/externalAuthService";




export const externalUserLoginController = async (req: Request<{}, {}, ILoginUser>, res: Response): Promise<void> => {
    const reqBody = req.body

    try {
        const userToken = await loginExternalUserSvc(reqBody)
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: userToken.token,
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


// export const continueWithGoogleController = async (req: Request<{}, {}, IContinueWithGoogle>, res: Response): Promise<void> => {
//     const { googleToken } = req.body
//     try {
//         const userToken = await continueWithGoogleSvc(googleToken)
//         res.status(200).json({
//             success: true,
//             message: "User logged in successfully",
//             token: userToken.token,
//         });
//     } catch (error: any) {
//         if(error instanceof ServiceError){
//             res.status(error.statusCode).json({
//                 success: false,
//                 message: error.message,
//             });
//         }else{
//             res.status(500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     }
// }