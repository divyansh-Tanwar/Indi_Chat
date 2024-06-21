import React from "react";
import {BsEmojiSmile} from "react-icons/bs";
import {ImAttachment} from "react-icons/im";
import {MdSend} from "react-icons/md";
import {FaMicrophone} from "react-icons/fa";
function MessageBar() {
  return (
    <div className="bg-gradient-to-r from-orange-600 from-15% via-white via-30% to-green-600 to-90% h-20 px-4 flex items-center  gap-6 relative "> 
      <>
        <div className="flex gap-6">
           <BsEmojiSmile className="text-white cursor-pointer text-xl" title="Emoji"/>
           <ImAttachment className="text-white  cursor-pointer text-xl" title="Attach File"/>
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
         <input type="Text" placeholder="Type a Message" className="bg-input-background text-sm focus:outline-none text-white  h-10 rounded-lg px-5 py-4 w-full"/>
        </div>
        <div className="flex w-10 items-center justify-center">
        <button>
        <MdSend className="text-white  cursor-pointer text-xl" title="Send Message"/>
        {/* <FaMicrophone className="text-white cursor-pointer text-xl" title="Record"/> */}
        </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
