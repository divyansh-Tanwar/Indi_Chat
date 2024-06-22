import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",AuthRoutes);
global.onlineUser=new Map();
app.use("/api/messages",MessageRoutes);



const server=app.listen(process.env.PORT,function(){
    console.log(`server running on port ${process.env.PORT}`)
})


