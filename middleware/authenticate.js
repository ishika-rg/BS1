// import jwt from "jsonwebtoken";
// import User from "../model/User.js";

// const keysecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// export const authenticate = async(req,res,next)=>{

//     try {
//         const token = req.headers.authorization;
        
//         const verifytoken = jwt.verify(token,keysecret);
        
//         const rootUser = await User.findOne({_id:verifytoken._id});
        
//         if(!rootUser) {throw new Error("user not found")}

//         req.token = token
//         req.rootUser = rootUser
//         req.userId = rootUser._id

//         next();

//     } catch (error) {
//         res.status(401).json({status:401,message:"Unauthorized no token provide"})
//     }
// };

// export default authenticate;
