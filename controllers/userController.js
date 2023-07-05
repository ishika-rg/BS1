import User from "../model/User.js";
import bcrypt from "bcryptjs";
import axios from 'axios';
import nodemailer from 'nodemailer';
import  jwt  from "jsonwebtoken";
 import authenticate from "../middleware/authenticate.js";
 
export const signup = async (req, res, next) => {

    try {
      const { name, email, password, username} = req.body;
  
      let existingUser;
      existingUser = await User.findOne({email});
      if(existingUser){
        return res.status(400).json({message:"this user is already exist"});
     }
      const hashedPassword = bcrypt.hashSync(password);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        username,
      });
      await user.save();
      return res.status(201).json({ user });
    } catch (err) {
      return res.status(400).json({ message: "this user is already exist" });
    }
  };
  
  export const login = async (req, res, next) => {
    try{
      const { email, password } = req.body;
      let existingUser;
     
     existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res
          .status(404)
          .json({ message: "user not found with this email please signup " });
      }
      
      const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const token = await userValid.generateAuthtoken();

      // cookiegenerate
      res.cookie("usercookie",token,{
          expires:new Date(Date.now()+9000000),
          httpOnly:true
      });

      const result = {
          userValid,
          token
      }
      return res.status(200).json({ status:201,result });
    }
    catch (err) {
      console.log(err);
    }
    
  };
  
  export const logout = async(req,res) => {
    try {
      req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
          return curelem.token !== req.token
      });

      res.clearCookie("usercookie",{path:"/"});

      req.rootUser.save();

      res.status(201).json({status:201})

  } catch (error) {
      res.status(401).json({status:401,error})
  }
  };
  let savedOTPS = {};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'kuldeep.ewp@gmail.com',
    pass: 'etruxeaawlxjkjkp',
  },
});

export const sendOtp = async (req,res) =>{
  const { email } = req.body;
  const digits = '0123456789';
  const limit = 4;
  let otp = '';

  for (let i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  const options = {
    from: 'kuldeep.ewp@gmail.com',
    to: email,
    subject: 'Testing node emails',
    html: `<p>Enter the otp: ${otp} to verify your email address</p>`,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("couldn't send");
    } else {
      savedOTPS[email] = otp;
      setTimeout(() => {
        delete savedOTPS.email;
      }, 60000);
      res.send('sent otp');
    }
  });


};

export  const verifyOtp = async(req,res) =>{
  const { otp: otpReceived, email } = req.body;

  if (savedOTPS[email] === otpReceived) {
    res.send('Verified');
  } else {
    res.status(500).send('Invalid OTP');
  }

};


export const forgotPassword = async(req,res)=>{
   
  try{
   const {email,newpassword} = req.body;
   const  user = await User.findOne({email});
   if(!user){
      console.log("hello");
     return res.status(400).json({ message: ' Invalid user' });
   }
   
   if (!newpassword) {
    // console.log("hello");
     return res.status(400).json({ message: 'New password is required' });
   }
     
   
   const hashedPass =   await bcrypt.hash(newpassword,10);
  
  await User.findByIdAndUpdate(user._id, { password: hashedPass });
    //  user.password = hashedPass;
    // await user.save();
  return   res.json({ message: 'Password reset successful' });
  }
  catch(err){
   console.log('Error in reset password route:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

