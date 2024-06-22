import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE, HOST } from "@/utils/ApiRoutes";
import { data } from "autoprefixer";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import Chat from "./Chat/Chat";
import { GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import { io } from "socket.io-client";

function Main() {
  const router=useRouter();
  const [{userInfo,currentChatUser},dispatch]=useStateProvider();
  const[redirectLogin,setRedirectLogin]=useState(false);
  const[socketEvent,SetsocketEvent]=useState(false);
  const socket=useRef();
 
  //this hook will redirect unauthenticated user to login page 
  useEffect(()=>{
    
    if(redirectLogin)
      {
        router.push("/login");
      }
  },[redirectLogin])
  

  onAuthStateChanged(firebaseAuth,async(currentUser)=>{
      if(!currentUser)
      {
        setRedirectLogin(true);
      }
      if(!userInfo&&currentUser?.email)
      {
          const {data}=await axios.post(CHECK_USER_ROUTE,{email:currentUser.email});
          console.log(data);
          if(!data.status)
            {
                  router.push("/login");
            }
            else
            {  
              if(data.data)
                {
                  const {id,email,name,profilePicture:profileImage,status}=data.data;
                  dispatch({
                              type:reducerCases.SET_USER_INFO,
                              userInfo:{
                                id,
                                name,
                                email,
                                profileImage,
                                status,
                              },
                           });
                }
            }
      }
      
  },[])
 
  

//this will make a socket when there is change in userinfo
  useEffect(()=>{
   
    if(userInfo)
      {
        socket.current=io(HOST);
        socket.current.emit("add-user",userInfo.id);
        dispatch({type:reducerCases.SET_SOCKET,socket});

      }
  },[userInfo])


  useEffect(()=>{
    if(socket.current&&!socketEvent)
      {  
        socket.current.on("msg-recieve",(data)=>{
          dispatch({type:reducerCases.ADD_MESSAGE,newMessage:{...data.message,},});
        })
        SetsocketEvent(true);
      }
   
  },[socket.current])
  

  //this effect hook will run when there is change in current chat user to upade the message state
  useEffect(()=>{
    
    const getMessages=async()=>{
       const{data:{messages}}=await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`);
          
        //  console.log("data mil gya")
        //   console.log({data});
        dispatch({type:reducerCases.SET_MESSAGES,messages})
      
    }
    
     
    if(currentChatUser?.id)
      {
        getMessages();
      }
   
  },[currentChatUser])

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList/>
      {currentChatUser?<Chat/>:<Empty/>}
      </div>
    </>
  );
}

export default Main;
