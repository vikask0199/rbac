import express from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserByEmailController, updateUserController } from "../controllers/UserController";


const router = express.Router();

router.post('/createUser', createUserController);
router.put('/updateUser', updateUserController); 
router.delete('/deleteUser/:userEmail', deleteUserController); 
router.get('/getUserByEmail/:userEmail', getUserByEmailController); 
router.get('/getAllUser', getAllUsersController);


export default router