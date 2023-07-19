import express from 'express';
import  { signup,login,sendOtp,verifyOtp,forgotPassword}  from '../controllers/userController.js';

const UserRouter = express.Router();


UserRouter.post('/signup',signup);
UserRouter.post('/login',login);
UserRouter.post('/sendotp',sendOtp);
UserRouter.post('/verifyotp',verifyOtp);
UserRouter.post('/forgotPassword',forgotPassword);
//UserRouter.post('/sendsms',sendSms)

export default UserRouter;