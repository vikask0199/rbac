import express from 'express';
import { createOrganizationProfileController, updateOrganizationProfileController } from '../controller/orgController';


const router = express.Router();

router.post("/createOrg/:userId", createOrganizationProfileController)
router.put("/updateOrg/:profileId/:userId", updateOrganizationProfileController)

export default router;