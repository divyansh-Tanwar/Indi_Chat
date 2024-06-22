import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

  function onboarding() {
  //-------------------------------------important states-------------------------------------------------------------------
  const router=useRouter();
  const[{userInfo,newUser},dispatch]=useStateProvider();
  const [name,setName]=useState(userInfo?.name||"");
  const [about,setAbout]=useState("");
  const [image,setImage]=useState("/default_avatar.png");

  //----------------------------------callback functions------------------------------------------------------------------

  useEffect(()=>{
   if(!newUser&&!userInfo?.email)
    {
       router.push("/login");
    }
    else if(!newUser&&userInfo?.email)
      {
        router.push("/");
      }

  },[newUser,userInfo,router])
  
  const validateDetails=()=>{

    if(name.length<3)
      {
        return false;
      }
      return true;
  }

  const onBoardUserHandle=async()=>{
    console.log("inside onBoard");
    if(validateDetails())
      {   
        console.log("inside if");
          const email=userInfo.email;
          try
          {   
            console.log("inside try")
              const {data}=await axios.post(ONBOARD_USER_ROUTE,{ email,name,about,image});
              console.log("below data")
              console.log(data.status);
              if(data.status)
                {   
                  console.log("above dispatch");
                   dispatch({type:reducerCases.SET_NEW_USER, newUser:false});
                    console.log("below dispatch");
                    dispatch({
                    type:reducerCases.SET_USER_INFO,
                    userInfo:{
                      id:data.user.id,
                      name,
                      email,
                      profileImage:image,
                      status:about,
                    },
                    });
                    console.log("value set");

                    router.push("/");               
                   }
          }
          catch(err)
          {          
                  console.log("kuch error aa gya");
          }
      }

  }

   //------------------------------ui of onborading page------------------------------------------------------------------
  return (
  <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
    <div className="flex  gap-2 justify-center items-center">
     <span className="text-3xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Indi</span>
     <span className="text-7xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Chat</span>
     <span className="text-lg pt-12 px-2 bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFA500,#FFA500,#FFFFFF,#FFFFFF,#FFFFFF,#00FF00,#00FF00)]">Judiye Apno Se...</span>
     </div>

     <h2 className="text-2xl mt-10 border relative p-2 ">
      <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-transparent to-green-500 opacity-40"></span>
        Create account
       </h2>
      {/* ------------------------------------input image------------------------------------------------ */}

       <Avatar type="xl" image={image} setImage={setImage}/>

       {/* ----------------------------------input name and about--------------------------------------- */}
     <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-centerjustify-center mt-2 gap-6">
         <Input name="Display Name"  state={name} setState={setName} label/>
         <Input name="About"  state={about} setState={setAbout} label/>
          {/*------------------------------------------- button --------------------------------------------*/}
         <div className=" flex items-center justify-center">
            <button 
            className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg hover:border-sky-200 hover:shadow-[0_0_2px_#FFA500,inset_0_0_2px_#FFA500,0_0_5px_#FFA500,0_0_5px_#FFA500,0_0_10px_#FFA500] hover:transition duration-1000 ease-in-out"
             onClick={onBoardUserHandle}  
            >
            Create Profile</button>
         </div>
        </div>
     </div>
     <div>
     
     </div>

  </div>
  );
}

export default onboarding;
