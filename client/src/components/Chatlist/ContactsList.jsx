import React, { useEffect, useState } from "react";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import { BiArrowBack } from "react-icons/bi";
import { useStateProvider } from "@/context/StateContext";
import reducer from "@/context/StateReducers";
import { reducerCases } from "@/context/constants";
import axios from "axios";
import{BiSearchAlt2} from 'react-icons/bi'
import ChatLIstItem from "./ChatLIstItem";
function ContactsList() {
  const[allContacts,SetallContacts]=useState([]);
  const[{},dispatch]=useStateProvider();
  useEffect(()=>{
   const getContacts=async()=>{
    try{
      const {data:{users},}=await axios.get(GET_ALL_CONTACTS); 
      SetallContacts(users);
    }catch(err)
    {
       console.log("error in fetching all contacts of user contactList.jsx")
    }   
   };
   getContacts();
  },[])

  return (
    <div className=" h-full flex flex-col">
       {/*---------------------- arrow and next chat--------------------------- */}
       <div className=" bg-gradient-to-r from-orange-600 from-30% via-white via-55% to-green-600 to-95% h-24 flex items-end px-3 py-4">
          <div className="flex items-center gap-12 text-white">
              <BiArrowBack className="cursor-pointer text-xl"
                onClick={()=>{dispatch({type:reducerCases.SET_ALL_CONTACTS_PAGE})}}
              />
              <span>New Chat</span>
          </div>
       </div>
         {/*---------------------- Search Bar------------------------------------- */}
        <div className=" bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
            <div className="bg-panel-header-background flex items-center  gap-5 px-3 py-1 rounded-lg flex-grow">
                <div >
                    <BiSearchAlt2 className=" text-white cursor-pointer text-xl"/>
                </div>
                <div>
                  <input type="text" placeholder="Search Contacts" className="bg-transparent text-sm focus:outline-none text-white w-full"

                  />
                </div>
            </div>
        </div>

        {/*------------------------------ rendering contacts------------------------------------------------------- */}
        {
          Object.entries(allContacts).map(([initialLetter,userList])=>{
            return(
              <div key={Date.now()+initialLetter}>
              <div className="text-teal-light pl-10 py-5">{initialLetter}</div>
              {
                userList.map((contact)=>{
                  return(
                    <ChatLIstItem
                     data={contact}
                     isContactPage={true}
                     key={contact.id}
                     />
                  )
                })
              }
               </div>
            )
          })
        }
    </div>
    
  );
}

export default ContactsList;
