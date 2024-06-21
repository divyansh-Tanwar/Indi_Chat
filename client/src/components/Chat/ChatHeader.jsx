import React from "react";
import Avatar from "../common/Avatar";
import {MdCall} from "react-icons/md";
import {IoVideocam} from "react-icons/io5";
import {BiSearchAlt2} from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
function ChatHeader() {
  const[{currentChatUser}]=useStateProvider();
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-gradient-to-r from-orange-600 from-15% via-white via-30% to-green-600 to-90% z-10"> 
      <div className="flex items-center justify-center gap-6">
          <Avatar type="sm" image={currentChatUser?.profilePicture}/>
          <div className="flex flex-col">
             <span className="text-primary-strong">{currentChatUser?.name}</span>
             <span className="text-secondary text-sm">Online Demo</span>
          </div>
      </div>
      <div className="flex gap-6 ">
        <MdCall className="text-white cursor-pointer text-xl"/>
        <IoVideocam className="text-white cursor-pointer text-xl"/>
        <BiSearchAlt2 className="text-white cursor-pointer text-xl"/>
        <BsThreeDotsVertical className="text-white cursor-pointer text-xl"/>
      </div>
    </div>
  );
}

export default ChatHeader;
