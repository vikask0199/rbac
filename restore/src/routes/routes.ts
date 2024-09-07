import express from "express"
import urls from "../config/urlConfig"
import externalPermissionsRoute from "./externalPermission"
import externalRoleRoute from "./externalRoleRoute"
import externalUserRoutes from "./externalUserRoute"
import subscriptionRoute from "./externalSubscriptionRoute"

const router = express.Router();

router.use(urls.externalUserBaseUrl, externalUserRoutes)
router.use(urls.externalRoleBaseUrl, externalRoleRoute)
router.use(urls.externalPermissionUrl, externalPermissionsRoute)
router.use(urls.externalSubscriptionUrl, subscriptionRoute)

export default router;