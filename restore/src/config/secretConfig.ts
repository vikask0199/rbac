import dotenv from "dotenv"



dotenv.config({ path: ".env" });

export default {
    secretKey: process.env.EXTERNAL_USER_JWT_SECRET_KEY,
    expirationTime: process.env.EXTERNAL_USER_JWT_EXPIRATION_TIME,
}
