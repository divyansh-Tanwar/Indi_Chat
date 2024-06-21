import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import {BsFillChatLeftTextFill,BsThreeDotsVertical} from "react-icons/bs";
import reducer from "@/context/StateReducers";
import { reducerCases } from "@/context/constants";

function ChatListHeader() {
  const [{userInfo},dispatch]=useStateProvider();
   
  const handleAllContactPage=()=>{
    dispatch({type:reducerCases.SET_ALL_CONTACTS_PAGE});
  }
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-gradient-to-r from-orange-600 from-20% via-white via-40% to-green-600 to-80%">
      <div className="cursor-pointer">
          <Avatar  type="sm" image={userInfo?.profileImage}/>
      </div>
      <div className="flex gap-6 ">
       <BsFillChatLeftTextFill 
       className="text-white cursor-pointer text-xl "
        title="New Chat"
        onClick={handleAllContactPage}
       />
       <>
        <BsThreeDotsVertical
          className="text-white cursor-pointer text-xl "
          title="Menu"
        />
       </>
      </div>
    </div>
  );
}

export default ChatListHeader;
