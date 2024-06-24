import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import {BsFillChatLeftTextFill,BsThreeDotsVertical} from "react-icons/bs";
import reducer from "@/context/StateReducers";
import { reducerCases } from "@/context/constants";
import { Router, useRouter } from "next/router";
import ContextMenu from "../common/ContextMenu";
import { useState } from "react";

function ChatListHeader() {
  const [{userInfo},dispatch]=useStateProvider();
  const router=useRouter();
  const[isContextMenuVisible,setisContextMenuVisible]=useState(false);
  const[contextMenuCoordinates,setcontextMenuCoordinates]=useState({x:0,y:0});

  const showContextMenu=(event)=>{
    event.preventDefault();
    setcontextMenuCoordinates({x:event.pageX,y:event.pageY});
    setisContextMenuVisible(true);
  }

  const contextMenuOptions=[
    { name:"Logout",callback:async ()=>{
       setisContextMenuVisible(false);
       router.push("/logout");
    }}
  ]
   
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
          id="context-opener"
          onClick={(event)=>showContextMenu(event)}
        />
         {isContextMenuVisible&&(<ContextMenu 
            options={contextMenuOptions}
            coordinates={contextMenuCoordinates}
            contextMenu={isContextMenuVisible}
            setcontextMenu={setisContextMenuVisible}
           />
          )}
       </>
      </div>
    </div>
  );
}

export default ChatListHeader;
