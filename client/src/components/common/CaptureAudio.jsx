import React, { useRef } from "react";
import { FaMicrophone, FaPauseCircle, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import { MdSend } from "react-icons/md";
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
  //important ref
  const audioRef=useRef(null)
  const mediaRecorderRef=useRef(null)
  const waveFormRef=useRef(null)


  //important call back
  const handlePlayRecording=()=>{

  }

  const handlePauseRecording=()=>{

  }

  const handleStartRecording=()=>{

  }

  const handleStopRecording=()=>{
    
  }

  const sendRecording= async()=>{

  }

  return (
    <div className="flex text-2xl w-full justify-end items-center">
        <div className="pt-1">
            <FaTrash className="text-white"  onClick={()=>hide()}/>
        </div>
        <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-search-input-container-background rounded-full drop-shadow-lg">
         {isRecording?(
          <div className="text-green-500 animate-pulse w-60 text-center">
          Recording <span>{recordingDuration}</span>
          </div>
         ):(
         <div>
          {recordedAudio&&(
              <>
                {!isPlaying?<FaPlay onClick={handlePlayRecording}/>:<FaStop onClick={handlePauseRecording}/>}
              </>
          )}
         </div>
         )}
         <div className="w-60" ref={waveFormRef} hidden={isRecording}/>
          {recordedAudio&&isPlaying&& (<span>{formatTime(currentPlaybackTime)}</span>)}
          {recordedAudio&&!isPlaying&&(<span>{formatTime(totalDuration)}</span>)}
          <audio  ref={audioRef} hidden/>
          <div className="mr-4">
             {!isRecording?<FaMicrophone className="text-green-500"  onClick={handleStartRecording}/>:<FaPauseCircle className="text-green-500" onClick={handleStopRecording}/>}
          </div>
          <div>
            <MdSend className="text-white cursor-pointer mr-4" title="Send" onClick={sendRecording}/>
          </div>
        </div>
    </div>
  );
}

export default CaptureAudio;
