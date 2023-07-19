import User from "../model/User.js";
import bcrypt from "bcryptjs";
import axios from 'axios';
import nodemailer from 'nodemailer';


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
      return res.status(200).json({ message: "Login Successfuly" });
    }
    catch (err) {
      console.log(err);
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

  // verify valid email or not
  const  user = await User.findOne({email});

  if(!user){
     console.log("this email is not registered");
    return res.status(400).json({ message: ' Invalid user' });
  }


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
   const {email,newPassword} = req.body;
   const  user = await User.findOne({email});
   if(!user){
      console.log("hello");
     return res.status(400).json({ message: ' Invalid user' });
   }
   
   if (!newPassword) {
    // console.log("hello");
     return res.status(400).json({ message: 'New password is required' });
   }
     
   
   const hashedPass =   await bcrypt.hash(newPassword,10);
  
  await User.findByIdAndUpdate(user._id, { password: hashedPass });
    //  user.password = hashedPass;
    // await user.save();
  return   res.json({ message: 'Password reset successfully' });
  }
  catch(err){
   console.log('Error in reset password route:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

