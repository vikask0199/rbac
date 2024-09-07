import express from "express"
import { createUserAccountController, updateAccountTypeController } from "../controller/externalUserController";


const router = express.Router();

router.post('/createExtAccount', createUserAccountController)
router.put('/updateAccountType/:userId', updateAccountTypeController)

export default router;