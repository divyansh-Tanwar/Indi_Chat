import { type } from "os";
import getprismaInstance from "../utils/PrismaClient.js";
import {renameSync} from 'fs'
export const addMessage= async(req,res,next)=>{
 
    try{
       const prisma=getprismaInstance();
       const {message,from,to}=req.body;
       //it is a global sate which tells if usere is online or not on basis of this we will update status of message as delievered or sent
       const getUser=onlineUser.get(to);
       if(message&&from&&to)
        {  
            // console.log("yaha hu")
            const newMessage=await prisma.messages.create({
                data:{
                    message,
                    sender:{connect:{id:parseInt(from)}},
                    reciever:{connect:{id:parseInt(to)}},
                    messageStatus:getUser?"delievered":"sent",
                },
                include:{sender:true,reciever:true},
            });
            return res.status(201).send({message:newMessage});
        }
        return res.status(400).send("from,to and Message is required");

    }catch(err){
        console.log("message database mein dalne mein error aa gye MessageController.js(addMessage)")
        next(err);
    }
}

export  const getMessages= async(req,res,next)=>{
   
    try{
       
        // console.log("yaha hu")
        // console.log("params nhi gye")
        const prisma=getprismaInstance();
        const {from,to}=req.params;

        // console.log("params mil gye")
        const messages=await prisma.messages.findMany({
            where:{
                OR:[
                    {  
                        //message send from client to other
                        senderId:parseInt(from),
                        recievedId:parseInt(to),
                    },
                    {    
                        //message sent from other to client
                        senderId:parseInt(to),
                        recievedId:parseInt(from),
                    }
                ]
            },
            orderBy:{
                id:"asc",
            }
        });

        // console.log("find many ho gya")
        const unreadMessages=[]
        messages.forEach((message,index)=>{
            // console.log("inside for each")
            // console.log(message.messageStatus)
            if(message.messageStatus!=="read" && message.senderId === parseInt(to))
                {  
                    //marking the message as read once they are recieved by the user
                    messages[index].messageStatus="read";
                    unreadMessages.push(message.id);
                    // console.log("inside if statement")
                }
        });
       
        //updating the status of unread message to read
        await prisma.messages.updateMany({
            where:{
                id:{in:unreadMessages},
            },
            data:{
                messageStatus:"read",
            },
        });
        // console.log("send ke upper")
        res.status(200).json({ messages });
        // console.log("send ke neecha")
    }
    catch(err)
    {   
        console.log("error in get message");
        next(err);
    }
};

export const addImageMessage= async(req,res,next)=>{

    try{

        if(req.file){
            const date=Date.now();
            let fileName="uploads/images/"+date+req.file.originalname;
            renameSync(req.file.path,fileName);
            const prisma=getprismaInstance();
            const {from,to}=req.query;
            if(from&&to)
                {
                    const message=await prisma.messages.create({
                        data:{
                             message:fileName,
                             sender:{connect:{id:parseInt(from)}},
                             reciever:{connect:{id:parseInt(to)}},
                             type:"image",
                        },
                    });
                    return res.status(201).json({message});
                }

                return res.status(400).send("from ,to is required");
        }

        return res.status(400).send("image is required");
    }catch(err){
        console.log("error in sending image message");
        next(err);
    }
}

export const addAudioMessage= async(req,res,next)=>{

    try{

        if(req.file){
            const date=Date.now();
            let fileName="uploads/recordings/"+date+req.file.originalname;
            renameSync(req.file.path,fileName);
            const prisma=getprismaInstance();
            const {from,to}=req.query;
            if(from&&to)
                {
                    const message=await prisma.messages.create({
                        data:{
                             message:fileName,
                             sender:{connect:{id:parseInt(from)}},
                             reciever:{connect:{id:parseInt(to)}},
                             type:"audio",
                        },
                    });
                    return res.status(201).json({message});
                }

                return res.status(400).send("from ,to is required");
        }

        return res.status(400).send("audio is required");
    }catch(err){
        console.log("error in sending audio message");
        next(err);
    }
}

export const getInitialContactsWithMessages=async(req,res,next)=>{
    try{
       
        const userId=parseInt(req.params.from);
        const prisma=getprismaInstance();
        const user=await prisma.User.findUnique({
            where:{id:userId},
            include:{
                      sentMessages:{
                            include:{ 
                                       reciever:true,
                                        sender:true
                                     },
                            orderBy:{
                                CreatedAt:"desc",
                            },
                        },
                        recievedMessages:{
                            include:{ 
                                reciever:true,
                                 sender:true
                              },
                             orderBy:{
                                   CreatedAt:"desc",
                              },
                        },
                    },
        });
        const messages=[...user.sentMessages,...user.recievedMessages];
        messages.sort((a,b)=>b.CreatedAt.getTime()-a.CreatedAt.getTime()); 
        const users=new Map();
        const messageStatusChange=[];
        messages.forEach((msg)=>{
            const isSender=msg.senderId===userId;
            const calculatedId=isSender?msg.recievedId:msg.senderId;
            if(msg.messageStatus==="sent")
                {
                    messageStatusChange.push(msg.id);
                }
            const {id,type,message,messageStatus,CreatedAt,senderId,recievedId}=msg;
            if(!users.get(calculatedId))
            {
               let user={messageId:id,type,message,messageStatus,CreatedAt,senderId,recievedId};
               if(isSender)
                {
                    user={
                        ...user,
                        ...msg.reciever,
                        totalUnreadMessages:0,
                    };
                }else
                {
                    user={
                        ...user,
                        ...msg.sender,
                        totalUnreadMessages:messageStatus!=="read"?1:0,
                    };
                }
                users.set(calculatedId,{...user});
            }
            else if(messageStatus!=="read"&&!isSender){
                const user=users.get(calculatedId);
                users.set(calculatedId,{
                    ...user,
                    totalUnreadMessages:user.totalUnreadMessages+1,
                });
            }
        });

        if(messageStatusChange.length)
            {
                await prisma.messages.updateMany({
                    where:{
                        id:{in:messageStatusChange},
                    },
                    data:{
                        messageStatus:"delivered",
                    },
                });
            }
        return res.status(200).json(
            {
                users:Array.from(users.values())
                ,onlineUsers:Array.from(onlineUser.keys())
            });

    }catch(err){
          next(err);
    }
}
