import { createHash, randomBytes } from "crypto";
import dotenv from "dotenv"


dotenv.config({ path: ".env" });

export const generateLink = async (): Promise<{ generatedUrl: string; generatedToken: string }> => {
    const resetPasswordToken = createHash('sha256').update(randomBytes(32)).digest('hex')
    const resetURL = `${process.env.RESET_PASSWORD_LINK}${resetPasswordToken}`
    return { generatedUrl: resetURL, generatedToken: resetPasswordToken };
}