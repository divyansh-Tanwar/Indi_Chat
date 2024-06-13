import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
function Avatar({type,image,setImage}) {
  const[hover,sethover]=useState(false);
  const[isContextMenuVisible,setisContextMenuVisible]=useState(false);
  const[contextMenuCoordinates,setcontextMenuCoordinates]=useState({x:0,y:0});
  const [grabPhoto,setgrabPhoto]=useState(false);

  useEffect(()=>{
   
    if(grabPhoto)
      {
         const data=document.getElementById("photo-picker");
         data.click();
         document.body.onfocus=(e)=>{

          setTimeout(()=>{
            setgrabPhoto(false);
          },1000)
          
         }
      }
  })

  const contextMenuOptions=[
    { name:"Take Photo",callback:()=>{}},
    { name:"Choose from Library",callback:()=>{}},
    { name:"Upload Photo",callback:()=>{
         setgrabPhoto(true);
    }},
    { name:"Remove Photo",callback:()=>{
      setImage("/default_avatar.png")
    }}
  ]

  const photoPickerChange=async (e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    const data=document.createElement("img");
    reader.onload=function(event){
      data.src=event.target.result;
      data.setAttribute("data.src",event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(()=>{
      setImage(data.src);
    },100); 


  }

  const showContextMenu=(event)=>{
    event.preventDefault();
    setcontextMenuCoordinates({x:event.pageX,y:event.pageY});
    setisContextMenuVisible(true);
  }
  
  return(
    <>
    {/*------------------------------------- for small(sm) size image---------------------------------------------------- */}
    <div className="flex items-center justify-center">
     {type==='sm'&&(
      <div className=" mt-3 relative h-10 w-10">
      <Image src={image} alt="Avatar" className="rounded-full" fill /> 
      </div>
     )}
     {/*----------------------------------------- for large(lg) size image------------------------------------------------ */}
     {type==='lg'&&(
      <div className=" mt-3 relative h-14 w-14">
      <Image src={image} alt="Avatar" className="rounded-full" fill /> 
      </div>
     )}
     {/*--------------------------------------------------- for xl ------------------------------------------------images */}
     {type==='xl'&&(
      <div className=" mt-3 relative  cursor-pointer z-0" onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)}>

          <div className={`z-10 bg-photopicker-overlay-background h-40 w-40 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-centre gap-2 *
          ${hover?'visible':'hidden'}
          `} 
          onClick={(event)=>showContextMenu(event)}
          id="context-opener"
          >
              <FaCamera className="text-2xl" 
              id="context-opener" 
              onClick={(event)=>showContextMenu(event)}
          />
          <span onClick={(event)=>showContextMenu(event)} id="context-opener" >Change Profile Photo</span>
          </div>

          <div className=" flex items-center justify-center  h-40 w-40">
              <Image src={image} alt="Avatar" className="rounded-full" fill /> 
          </div>
      </div>
     )}
    </div>
     {/*----------------------------- context Menu component-------------------------------------------------------------- */}
      {
           isContextMenuVisible&&(<ContextMenu
            options={contextMenuOptions}
            coordinates={contextMenuCoordinates}
            contextMenu={isContextMenuVisible}
            setcontextMenu={setisContextMenuVisible}
           />
      )}
      {/* ------------------------------photopicker element for uplode photo option---------------------------------------- */}
      {grabPhoto&&<PhotoPicker onChange={photoPickerChange} />}
  </>
  )
  
}

export default Avatar;
