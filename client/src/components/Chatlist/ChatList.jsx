import React, { useEffect, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";

function ChatList() {
  const [{contactPage}]=useStateProvider();
  const[pageType,SetPageType]=useState("default");
  useEffect(()=>{
    if(contactPage){
      SetPageType("all-contacts");
    }
    else
    {
      SetPageType("default");
    }
  })
  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20 border-r-2" >
    {/* case1: */}
    {
      pageType==='default'&&(
        <>
        <ChatListHeader/>
        <SearchBar/>
         <List/>
        </>
      )
    }
    {/* case2: */}
    {
      pageType==='all-contacts'&&(
         <ContactsList/>
      )
    }
    </div>
  );
}

export default ChatList;
