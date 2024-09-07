import bcrypt from "bcrypt";


export const encodeGoogleId = async (id: string): Promise<string> => {
    const hashedGoogleId = bcrypt.hash(id, 12);
    return hashedGoogleId;
}

export const validateGoogleId = async (id: string, hashedGoogleId: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(id, hashedGoogleId);
    return isMatch;
}