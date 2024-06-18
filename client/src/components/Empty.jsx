import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="border-conversation-border border-l-4 border-l-white  w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-orange-500 items-center justify-center">
      <div>
      <Image src="/INDIA.gif" alt="Logo" height={600}  width={600}/>
      <div className="flex  gap-2 justify-center items-center">
        <span className="text-3xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Indi</span>
        <span className="text-7xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Chat</span>
        <span className="text-lg pt-12 px-2 bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Judiye Apno Se...</span>
      </div>
      </div>
    </div>
  );
}

export default Empty;
