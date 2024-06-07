import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import { useState } from "react";

  function onboarding() {
  const[{userInfo}]=useStateProvider();
  const [name,setName]=useState(userInfo?.name||"");
  const [about,setAbout]=useState("");
  const [image,setImage]=useState("/default_avatar.png");
  return (<div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">

    {/* <div className="flex items-center justify-centre gap-2">
      <Image src="/INDIA.gif" alt="INDI-CHAT" height={600} width={600}/>
    </div> */}

    <div className="flex  gap-2 justify-center items-center">
     <span className="text-3xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Indi</span>
     <span className="text-7xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Chat</span>
     <span className="text-lg pt-12 px-2 bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Judiye Apno Se...</span>
     </div>

     <h2 className="text-2xl mt-10 border relative p-2 ">
      <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-transparent to-green-500 opacity-40"></span>
        Create account
       </h2>
      
     <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-centerjustify-center mt-5 gap-6">
         <Input name="Display Name"  state={name} setState={setName} label/>
         <Input name="About"  state={about} setState={setAbout} label/>
         {/* <Input name=""  state={about} setState={setAbout} label/> */}
        </div>
     </div>

  </div>);
}

export default onboarding;
