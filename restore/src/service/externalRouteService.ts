import { IExternalRoute } from "../interface/ExternalRouteInterface";
import { ExternalRoute } from "../models/ExternalRoutes";
import { getRouteByIdRepo, saveExternalRouteRepo } from "../repositories/externalRouteRepository";
import { ServiceError } from "../utils/ServiceError";




export const createRouteSvc = async (data: IExternalRoute): Promise<ExternalRoute> => {

    const route = new ExternalRoute();
    route.externalRoutePath = data.externalRoutePath;
    route.routeDisplayName = data.routeDisplayName;

    const savedRoute = await saveExternalRouteRepo(route);

    return savedRoute;
};


export const updateRouteSvc = async (routeId: string, data: IExternalRoute): Promise<ExternalRoute> => {
        const route = await getRouteByIdRepo(routeId);
        if (!route) {
            throw new ServiceError('Route not found', 404);
        }

        if (data.externalRoutePath) {
            route.externalRoutePath = data.externalRoutePath;
        }

        if (data.routeDisplayName) {
            route.routeDisplayName = data.routeDisplayName;
        }

        const updatedRoute = await saveExternalRouteRepo(route);
        return updatedRoute
};