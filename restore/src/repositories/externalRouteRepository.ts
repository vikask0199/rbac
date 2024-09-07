import { postgresDataSource } from "../config/dbConfig"
import { ExternalRoute } from "../models/ExternalRoutes";


export const getExternalRouteRepo = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(ExternalRoute)
}

export const saveExternalRouteRepo = async (data: ExternalRoute): Promise<ExternalRoute> => {
    const repository = await getExternalRouteRepo();
    return repository.save(data);
}

export const getRouteByNameRepo = async (name: string): Promise<ExternalRoute | null> => {
    const repository = await getExternalRouteRepo();
    const data = await repository.findOne({
        where: { routeDisplayName: name },
    })
    return data;
}

export const getAllRoutesRepo = async (): Promise<ExternalRoute[]> => {
    const repository = await getExternalRouteRepo();
    return repository.find();
}

export const getRouteByIdRepo = async(id: string):Promise<ExternalRoute | null> =>{
    const repository = await getExternalRouteRepo();
    return repository.findOne({
        where: { externalRouteId: id },
        relations: ['permissions']
    })
}