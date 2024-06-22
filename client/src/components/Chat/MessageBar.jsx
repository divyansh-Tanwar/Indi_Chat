import React, { useEffect, useRef, useState } from "react";
import {BsEmojiSmile} from "react-icons/bs";
import {ImAttachment} from "react-icons/im";
import {MdSend} from "react-icons/md";
import {FaMicrophone} from "react-icons/fa";
import { useStateProvider } from "@/context/StateContext";
import { ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import PhotoPicker from "../common/PhotoPicker";
function MessageBar() {
  const[{userInfo,currentChatUser,socket},dispatch]=useStateProvider();
  const[message,setMessage]=useState("");
  const[showEmojiPicker,setshowEmojiPicker]=useState(false);
  const emojiPickerRef=useRef(null);
  const [grabPhoto,setgrabPhoto]=useState(false);

  const photoPickerChange=async (e)=>{
   
    try{
      const file= e.target.files[0];
      const formData=new FormData();
      formData.append("image",file);
      const response=await axios.post(ADD_IMAGE_MESSAGE_ROUTE,formData,{
        headers:{
           "Content-Type":"multipart/form-data",
        },
        params:{
          from:userInfo.id,
          to:currentChatUser.id,
        }
      });

      if(response.status===201)
        {
          socket.current.emit("send-msg",{to:currentChatUser?.id,from:userInfo?.id, message:response.data.message});
          dispatch({type:reducerCases.ADD_MESSAGE,newMessage:{...response.data.message,},fromSelf:true,});
        }
        else
        {
            console.log("image cant be sent MessageBar.jsx")
        }

    }catch(err){
        
      console.log("image message have some problem check MessageBar.jsx")
      console.log(err);
    }

  }
 
  //this is for emoji
  useEffect(()=>{
     
    const handleOutsideClick=(event)=>{
          if(event.target.id!=="emoji-open")
            {
              if(emojiPickerRef.current&&!emojiPickerRef.current.contains(event.target))
                {
                  setshowEmojiPicker(false);
                }
            }
    }
    document.addEventListener("click",handleOutsideClick);
    return()=>{
      document.removeEventListener("click",handleOutsideClick);
    } 
  },[])

  //for emoji messages
const handleEmojiModal=()=>{
  setshowEmojiPicker(!showEmojiPicker);
}

//for emoji
const handleEmojiClick= (emoji)=>{
  setMessage((prevMessage)=>(prevMessage+=emoji.emoji))

}

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
  };

    //-----------------------use effect to send image messages-------------------------------------------------------
    useEffect(()=>{
   
      if(grabPhoto)
        {
           const data=document.getElementById("photo-picker");
           data.click();
           document.body.onfocus=(e)=>{
  
            setTimeout(()=>{
              setgrabPhoto(false);
            },1000)
            
           }
        }
    },[grabPhoto]);

  return (
    <div className="bg-gradient-to-r from-orange-600 from-15% via-white via-30% to-green-600 to-90% h-20 px-4 flex items-center  gap-6 relative "> 
      <>
        <div className="flex gap-6">
           <BsEmojiSmile className="text-white cursor-pointer text-xl" title="Emoji" id="emoji-open"  onClick={handleEmojiModal}/>
           {showEmojiPicker&&
           <div className="absolute bottom-24 left-16 z-40" ref={emojiPickerRef}>
           <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
           </div>
           }
           <ImAttachment className="text-white  cursor-pointer text-xl" title="Attach File" onClick={()=>setgrabPhoto(true)}/>
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
       {/* ------------------------------photopicker element for uplode photo option---------------------------------------- */}
       {grabPhoto&&<PhotoPicker onChange={photoPickerChange} />}
    </div>
  );
}

export default MessageBar;
