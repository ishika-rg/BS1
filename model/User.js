import mongoose from 'mongoose';
//import jwt from "jsonwebtoken";

//const keysecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        //required:true,
    },
    username:{
        type:String,
       // required:true,
         //unique:true,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        //required:true,
        //minlength:6,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifytoken:{
        type: String,
    }
   
    
});

// UserSchema.methods.generateAuthtoken = async function () {
//     try {
//         let token23 = jwt.sign({ _id: this._id }, keysecret, {
//             expiresIn: "1d"
//         });

//         this.tokens = this.tokens.concat({ token: token23 });
//         await this.save();
//         return token23;
//     } catch (error) {
//         res.status(422).json(error)
//     }
// }

export default mongoose.model("User",UserSchema);


