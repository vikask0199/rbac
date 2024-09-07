import jwt, { JwtPayload } from "jsonwebtoken";
import secretConfig from "../config/secretConfig";
import { IJwtResponse, IPayLoadToJWT } from "../interface/JwtInterface";



const JWT_EXPIRATION_TIME = secretConfig.expirationTime;
const secretKey = secretConfig.secretKey;

if (!secretKey) {
    throw new Error("Secret key is not defined in the environment variables");
}


export const generateJwtTokenSvc = async (payload: IPayLoadToJWT): Promise<IJwtResponse> => {
    try {
        const token = jwt.sign(payload, secretKey, { expiresIn: JWT_EXPIRATION_TIME });
        return { token };
    } catch (error: any) {
        throw new Error(`Failed to generate token: ${error.message}`);
    }
}
