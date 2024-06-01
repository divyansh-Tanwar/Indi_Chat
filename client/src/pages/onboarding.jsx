import Image from "next/image";
import React from "react";

function onboarding() {
  return (<div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
    <div className="flex items-center justify-centre gap-2">
      <Image src="/INDIA.gif" alt="INDI-CHAT" height={600} width={600}/>
    </div>

    <div className="flex  gap-2 justify-center items-center">
     <span className="text-3xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Indi</span>
     <span className="text-7xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Chat</span>
     <span className="text-lg pt-12 px-2 bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Judiye Apno Se...</span>
     </div>

     <h2 className="text-2xl">Create Your Profile</h2>

     <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-centerjustify-center mt-5 gap-6">

        </div>
     </div>

  </div>);
}

export default onboarding;
