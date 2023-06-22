import express from 'express';
import  { signup,login}  from '../controllers/userController.js';

const UserRouter = express.Router();


UserRouter.post('/signup',signup);
UserRouter.post('/login',login);
//UserRouter.post('/sendotp',sendOtp);
//UserRouter.post('/verifyotp',verifyOtp);
//UserRouter.post('/resetpassword',forgotPassword);
//UserRouter.post('/sendsms',sendSms)

export default UserRouter;