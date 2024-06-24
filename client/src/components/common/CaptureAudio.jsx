import React, { useEffect, useRef } from "react";
import { FaMicrophone, FaPauseCircle, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { ADD_AUDIO_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";
function CaptureAudio({hide}) {
  //getting acces to global value
  const[{userInfo,currentChatUser,socket},dispatch]=useStateProvider();
  //important states
  const[isRecording,setisRecording]=useState(false);
  const[recordedAudio,setRecordedAudio]=useState(null);
  const[waveform,setWaveform]=useState(null);
  const[recordingDuration,setRecordingDuration]=useState(0);
  const[currentPlaybackTime,setCurrentPlaybackTime]=useState(0);
  const[totalDuration,setTotalDuration]=useState(0);
  const[isPlaying,setisPlaying]=useState(false);
  const[renderedAudio,setRenderedAudio]=useState(null);

  //important ref
  const audioRef=useRef(null)
  const mediaRecorderRef=useRef(null)
  const waveFormRef=useRef(null)

  // all use effects
  useEffect(()=>{
     const wavesurfer=WaveSurfer.create({
      container:waveFormRef.current,
      waveColor:"#ccc",
      progressColor:"#4a9eff",
      cursorColor:"#7ae3c3",
      barWidth:2,
      height:30,
      responsive:true,

     });

     setWaveform(wavesurfer);

     wavesurfer.on("finish",()=>{
      setisPlaying(false);
     })

     return ()=>{
      wavesurfer.destroy();
     };
  },[])

  //this will run when we have waveform

  useEffect(()=>{
    if(waveform)
      {
        handleStartRecording();
      }

  },[waveform])

  //this use effect is to create interval and set interval
  useEffect(()=>{
    let interval;
    if(isRecording)
      {
         interval=setInterval(()=>{
           setRecordingDuration((prevDuration)=>{
             setTotalDuration(prevDuration+1);
             return prevDuration+1;
           });
         },1000);
      }

    return ()=>{
      clearInterval(interval);
    };

  },[isRecording])

  //when we have the recorded audio

  useEffect(()=>{
    if(recordedAudio)
      {  
        console.log("inside recorded audio code")
         const updatePlaybackTime=()=>{
          console.log("above")
          setCurrentPlaybackTime(recordedAudio.currentTime); //could be error
          console.log("below")
         };
         console.log("outside")
         audioRef.current.addEventListener('timeupdate', updatePlaybackTime);
         
            return ()=>{
              if(audioRef.current)
                {
                  audioRef.current.removeEventListner("timeupdate",updatePlaybackTime);
                }
                else
                {
                  console.log("some error");
                }
          }
        
      }

  },[recordedAudio]);




  //--------------------------------------------------important call back------------------------------------------------------------
  const handleStartRecording=()=>{
     
     setRecordingDuration(0);
     setCurrentPlaybackTime(0);
     setTotalDuration(0);
     setisRecording(true);
     setRecordedAudio(null);
     navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
      const mediaRecorder=new MediaRecorder(stream);
      mediaRecorderRef.current=mediaRecorder;
      audioRef.current.srcObject=stream;

      const chunks=[];
      mediaRecorder.ondataavailable=(e)=>chunks.push(e.data);
      mediaRecorder.onstop=()=>{
        const blob=new Blob(chunks,{type:"audio/ogg; codecs=opus"});
        const audioURL=URL.createObjectURL(blob);
        const audio=new Audio(audioURL);
        setRecordedAudio(audio);

        waveform.load(audioURL);
      };
      mediaRecorder.start();
     }).catch((error)=>{
         console.log("error in handle start recording(error in accessing microphone) (CaptureAudio.jsx")
     })

  }

  const handleStopRecording=()=>{
    if(mediaRecorderRef.current&&isRecording){
      mediaRecorderRef.current.stop();
      setisRecording(false);
      waveform.stop();

      const audioChunks=[];

      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop",()=>{
        const audioBlob=new Blob(audioChunks,{type:"audio/mp3"});
        const audioFile=new File([audioBlob],"recording.mp3");
        setRenderedAudio(audioFile);
        //my code
        setRecordedAudio(audioFile);
      })
    }
    
  }

  const handlePlayRecording=()=>{

      if(recordedAudio)
        {
          waveform.stop();
          waveform.play();
          audioRef.current.play();
          setisPlaying(true);
        }
  }

  const handlePauseRecording=()=>{

     waveform.stop();
     audioRef.current.pause();
     setisPlaying(false);
  }

 

 

const sendRecording= async()=>{
       
    try{
      const formData=new FormData();
      formData.append("audio",renderedAudio);
      const response=await axios.post(ADD_AUDIO_MESSAGE_ROUTE,formData,{
        headers:{
           "Content-Type":"multipart/form-data",
        },
        params:{
          from:userInfo.id,
          to:currentChatUser.id,
        }
      });

      if(response.status===201)
        {
          socket.current.emit("send-msg",{to:currentChatUser?.id,from:userInfo?.id, message:response.data.message});
          dispatch({type:reducerCases .ADD_MESSAGE,newMessage:{...response.data.message,},fromSelf:true,});
        }
        else
        {
            console.log("image cant be sent MessageBar.jsx")
        }

    }catch(err){
        
      console.log("image message have some problem check MessageBar.jsx")
      console.log(err);
    }
 }

  const formatTime=(time)=>{
    if(isNaN(time))
      {
        return "00:00";
      }
      const minutes=Math.floor(time/60);
      const seconds=Math.floor(time%60);
      return `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
  }

  return (
    <div className="flex text-2xl w-full justify-end items-center">
        <div className="pt-1">
            <FaTrash className="text-orange-600"  onClick={()=>hide()}/>
        </div>
        <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-search-input-container-background rounded-full drop-shadow-lg">
         {isRecording?(
              <div className="text-green-500 animate-pulse w-60 text-center">
              Recording <span>{recordingDuration}</span>
              </div>
            ):(
            <div>
              {recordedAudio&&
                  <>
                    {!isPlaying?<FaPlay className="text-green-500" onClick={handlePlayRecording}/>:<FaStop className="text-green-500" onClick={handlePauseRecording}/>}
                  </>
              }
            </div>
         )}
         <div className="w-60" ref={waveFormRef} hidden={isRecording}/>
          {recordedAudio&&isPlaying&& (<span>{formatTime(currentPlaybackTime)}</span>)}
          {recordedAudio&&!isPlaying&&(<span>{formatTime(totalDuration)}</span>)}
          <audio  ref={audioRef} hidden/>
        </div>
          <div className="mr-4">
             {!isRecording?(<FaMicrophone className="text-white"  onClick={handleStartRecording}/>):(<FaPauseCircle className="text-white" onClick={handleStopRecording}/>)}
          </div>
          <div>
            <MdSend className="text-white cursor-pointer mr-4" title="Send" onClick={sendRecording}/>
          </div>
    </div>
  );
}

export default CaptureAudio;
