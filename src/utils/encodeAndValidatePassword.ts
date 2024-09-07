import bcrypt from "bcrypt";


export const passwordEncode = async (password: string): Promise<string> => {
    const encryptedToken = await bcrypt.hash(password, 12)
    return encryptedToken
}


export const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}