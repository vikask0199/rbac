import { postgresDataSource } from "../config/dbConfig";
import { Member } from "../models/Member";




export const getMemberRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(Member);
}
