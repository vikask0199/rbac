import express from "express";
import urls from "../config/urlConfig";
import externalUserRoute from "./extUserRoute";
import externalSubscriptionRoutes from "./subscriptionRoute";
import orgRoutes from "./orgRoutes"

const router = express.Router();

router.use(urls.externalSubscriptionUrl, externalSubscriptionRoutes)
router.use(urls.externalUserBaseUrl, externalUserRoute)
router.use(urls.externalOrgBaseUrl, orgRoutes)

export default router