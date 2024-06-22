import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { Server } from "socket.io";
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/uploads/images",express.static("uploads/images"));

app.use("/api/auth",AuthRoutes);
app.use("/api/messages",MessageRoutes);



const server=app.listen(process.env.PORT,function(){
    console.log(`server running on port ${process.env.PORT}`)
})

//establishing a socket setting up origin
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    },
});

global.onlineUser=new Map();

//setting private room for each pair of chat
io.on("connection",(socket)=>{
    global.chatSocket=socket;

    socket.on("add-user",(userId)=>{
        onlineUser.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUser.get(data.to);
        if(sendUserSocket)
            {
            socket.to(sendUserSocket).emit("msg-recieve",{
                from:data.from,
                message:data.message,
            })
            }
    })
});


