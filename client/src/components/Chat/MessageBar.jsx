import React, { useState } from "react";
import {BsEmojiSmile} from "react-icons/bs";
import {ImAttachment} from "react-icons/im";
import {MdSend} from "react-icons/md";
import {FaMicrophone} from "react-icons/fa";
import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { reducerCases } from "@/context/constants";
function MessageBar() {
  const[{userInfo,currentChatUser,socket},dispatch]=useStateProvider();
  const[message,setMessage]=useState("");
  const sendMessage=async()=>{
     
    // alert("send")
    try{
          const {data}=await axios.post(ADD_MESSAGE_ROUTE,{
            to:currentChatUser?.id,
            from:userInfo?.id,
            message
          });
          socket.current.emit("send-msg",{to:currentChatUser?.id,from:userInfo?.id, message:data.message});
          dispatch({type:reducerCases.ADD_MESSAGE,newMessage:{...data.message,},fromSelf:true,});
          setMessage("");
    }catch(err){
        console.log("reques can't send to message routes(MessageBar.jsx)")
    }
  }
  return (
    <div className="bg-gradient-to-r from-orange-600 from-15% via-white via-30% to-green-600 to-90% h-20 px-4 flex items-center  gap-6 relative "> 
      <>
        <div className="flex gap-6">
           <BsEmojiSmile className="text-white cursor-pointer text-xl" title="Emoji"/>
           <ImAttachment className="text-white  cursor-pointer text-xl" title="Attach File"/>
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
         <input 
         type="Text"
          placeholder="Type a Message" 
          className="bg-input-background text-sm focus:outline-none text-white  h-10 rounded-lg px-5 py-4 w-full"
            onChange={(event)=>setMessage(event.target.value)}
            value={message}
          />
        </div>
        <div className="flex w-10 items-center justify-center">
        <button>
        <MdSend className="text-white  cursor-pointer text-xl" title="Send Message"  onClick={sendMessage}/>
        {/* <FaMicrophone className="text-white cursor-pointer text-xl" title="Record"/> */}
        </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
