import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { FcGoogle } from 'react-icons/fc';
import axios from "axios";
function login() {

   const handleLogin= async()=>{
    const provider=new GoogleAuthProvider();
    const {user:{displayName:name,email,photoURL:profileImage}}= await signInWithPopup(firebaseAuth,provider);
    // console.log({user});
    try{
      
      if(email)
        {
             const {data}=await axios.post(CHECK_USER_ROUTE,{email});
             console.log(data);
        }

    } catch(err){
       
      console.log(err);
    }
   } ;

  return <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
  
    <div className="flex justify-center items-center">
     <Image src="/INDIA.gif" alt="whatsapp"  height={700} width={700} />
    </div>

    <div className="flex  gap-2 justify-center items-center">
     <span className="text-3xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Indi</span>
     <span className="text-7xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Chat</span>
     <span className="text-lg pt-12 px-2 bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Judiye Apno Se...</span>
     </div>

    <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg hover:border-sky-200 hover:shadow-[0_0_2px_#FFA500,inset_0_0_2px_#FFA500,0_0_5px_#FFA500,0_0_5px_#FFA500,0_0_10px_#FFA500] hover:transition duration-1000 ease-in-out" 
     onClick={handleLogin}
    >
    <FcGoogle className="text-4xl"/>
    <span className="text-white  text-2xl">Login With Google</span>
    </button>
  </div>;
}

export default login;
