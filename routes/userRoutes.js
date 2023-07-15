import express from 'express';
import  { signup,login,sendOtp,verifyOtp,forgotPassword}  from '../controllers/userController.js';
//import {authenticate} from "../middleware/authenticate.js";
const UserRouter = express.Router();


UserRouter.post('/signup',signup);
UserRouter.post('/login',login);
UserRouter.post('/sendotp',sendOtp);
UserRouter.post('/verifyotp',verifyOtp);
UserRouter.post('/forgotPassword',forgotPassword);
//UserRouter.get('/logout',authenticate,logout);
//UserRouter.post('/sendsms',sendSms)

export default UserRouter;