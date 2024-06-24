import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/ApiRoutes";
import React, { useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Avatar from "../common/Avatar";
import { FaPlay, FaStop } from "react-icons/fa";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { useEffect } from "react";

function VoiceMessage({message}){
   
    const [{currentChatUser,userInfo}]=useStateProvider();
    const[audioMessage,setAudioMessage]=useState(null);
    const[isPlaying,setisPlaying]=useState(false);
    const[currentPlaybackTime,setCurrentPlaybackTime]=useState(0);
    const[totalDuration,setTotalDuration]=useState(0);

    const waveFormRef=useRef(null);
    const waveform=useRef(null);

    useEffect(()=>{
        if(waveform.current===null)
            {
                 waveform.current=WaveSurfer.create({
                    container:waveFormRef.current,
                    waveColor:"#ccc",
                    progressColor:"#4a9eff",
                    cursorColor:"#7ae3c3",
                    barWidth:2,
                    height:30,
                    responsive:true,
              
                   });
              
                   waveform.current.on("finish",()=>{
                    setisPlaying(false);
                   });
            }
       
   
        return ()=>{
            waveform.current.destroy();
        };
     },[])


     useEffect(() => {
       
        const audioURL=`${HOST}/${message.message}`;
        const audio =new Audio(audioURL);
        setAudioMessage(audio);
        waveform.current.load(audioURL);
        waveform.current.on("ready",()=>{
            setTotalDuration(waveform.current.getDuration());
        });
     }, [message.message])
     


    useEffect(()=>{
        if(audioMessage)
          {  
            console.log("inside recorded audio code")
             const updatePlaybackTime=()=>{
              console.log("above")
              setCurrentPlaybackTime(audioMessage.currentTime); //could be error
              console.log("below")
             };
             console.log("outside")
             audioMessage.addEventListener('timeupdate', updatePlaybackTime);
             
                return ()=>{
                  if(audioMessage)
                    {
                      audioMessage.removeEventListner("timeupdate",updatePlaybackTime);
                    }
                    else
                    {
                      console.log("some error");
                    }
              }
            
          }
    
      },[audioMessage]);


      const formatTime=(time)=>{
        if(isNaN(time))
          {
            return "00:00";
          }
          const minutes=Math.floor(time/60);
          const seconds=Math.floor(time%60);
          return `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
      }
    

    const handlePlayAudio=()=>{

        if(audioMessage)
          {
            waveform.current.stop();
            waveform.current.play();
            audioMessage.play();
            setisPlaying(true);
          }
    }
  
    const handlePauseAudio=()=>{
  
       waveform.current.stop();
       audioMessage.pause();
       setisPlaying(false);
    }

    return(
       
        <div className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-md ${message.senderId===currentChatUser.id?"bg-orange-600":"bg-green-600"}`} >
          <Avatar type="lg" image={currentChatUser?.profilePicture}/>
          <div className="cursor-pointer text-xl">
             {!isPlaying? (<FaPlay onClick={handlePlayAudio}/>):(<FaStop onClick={handlePauseAudio}/>)}
          </div>
          <div className="relative">
              <div className="w-60" ref={waveFormRef}/>
              <div className="text-bubble-meta text-[11px] pt-1 flex justify-between absolute bottom-[-22px] w-full">
                 <span>{formatTime(isPlaying?currentPlaybackTime:totalDuration)}</span>
                 <div className="flex gap-1">
                    <span>{calculateTime(message.CreatedAt)}</span>
                    {message.senderId===userInfo.id&&<MessageStatus MessageStatus={message.MessageStatus}/>}
                 </div>
              </div>
          </div>
        </div>
    );
}

export default VoiceMessage;