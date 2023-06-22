
import express from 'express';
import mongoose from "mongoose";
import router from "./routes/bookRoutes.js";
import cors from 'cors';
import UserRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/books", router); // localhost:3000/books
app.use('/user',UserRouter);


mongoose
  .connect(
    "mongodb+srv://Kuldeep:JYskIizj66fq5qvz@cluster0.cz6vhhw.mongodb.net/bookStore?retryWrites=true&w=majority",
        {
          useNewUrlParser : true,
        useUnifiedTopology : true
        }
  )
  .then(() => {
    console.log("connected to database");
    
  })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
