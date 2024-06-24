import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { calculateTime } from "@/utils/CalculateTime";
function SearchMessages() {

  const [{currentChatUser,messages},dispatch]=useStateProvider();
  const [searchTerm,setSearchterm]=useState("");
  const [searchMessages,setSearchMessages]=useState([]);
  
  useEffect(()=>{
    if(searchTerm)
      {
        setSearchMessages(messages.filter((message)=>message.type==="text"&&message.message.includes(searchTerm)))
      }
      else
      {
        setSearchMessages([]);
      }
  },[searchTerm])

  return (
    <div className="border-orange-600 border-l-2 w-full bg-black flex flex-col z-10 max-h-screen" >
         <div className="h-16 px-4 py-5 flex gap-10 items-center bg-gradient-to-r from-orange-600 from-30% via-white via-50% to-green-600 to-80% text-primary-strong">
           <IoClose className="text-white cursor-pointer text-2xl" onClick={()=>dispatch({type:reducerCases.SET_MESSAGES_SEARCH})}/>
           <span>Search Messages</span>
         </div>
         <div className="overflow-auto custom-scrollbar h-full">
            <div className="flex items-center flex-col w-full">
                <div className="flex px-5 items-center gap-3 h-14 w-full">
                      <div className="bg-panel-header-background flex items-center  gap-5 px-3 py-1 rounded-lg flex-grow">
                        <div >
                            <BiSearchAlt2 className=" text-white cursor-pointer text-xl"/>
                        </div>
                        <div>
                          <input type="text" value={searchTerm} onChange={(e)=>setSearchterm(e.target.value)} placeholder="Search Messages" className="bg-transparent text-sm focus:outline-none text-white w-full" />
                        </div>
                  </div>
               </div>
                <span className="mt-10 text-white">
                {!searchTerm.length && `Search for messages with ${currentChatUser.name}`}
                </span>
            </div>
            <div className="flex justify-center h-full flex-col">
                {searchTerm.length>0&&!searchMessages.length && <span className="text-white w-full flex justify-center">No Messages Found</span>}
                <div className="flex flex-col w-full h-full">
                  {searchMessages.map((message)=>
                  <div className="flex cursor-pointer flex-col justify-center hover:bg-background-default-hover w-full px-5 border-bottom-[0.1px] border-secondary py-5">
                       <div className="text-sm text-white">{calculateTime(message.CreatedAt)}</div>
                       <div className="text-orange-500">{message.message}</div>
                  </div>
                  )}
                </div>
            </div>
         </div>
    </div>
  );
}

export default SearchMessages;
