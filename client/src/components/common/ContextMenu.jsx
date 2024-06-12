import React, { useEffect, useRef } from "react";

function ContextMenu({options,coordinates,contextMenu,setcontextMenu}) {
  const contextMenuRef=useRef(null);

  //-------------------------------------  if we click outside the context menu the context menu must disapper---------------------------------
  useEffect(()=>{
    const handleOutsideClick=(event)=>{
      if(event.target.id!=="context-opener")
        {
          if(contextMenuRef.current &&!contextMenuRef.current.contains(event.target))
            {
              setcontextMenu(false);
            }
        }
    };
    document.addEventListener("click",handleOutsideClick);
    return ()=>{
      document.removeEventListener("click",handleOutsideClick);
    }
    },[])

  //------------------------------------ (handle click)if we click at any option on context menu the context menu will disapper-------------------------------
  const handleClick=(e,callback)=>{
     e.stopPropagation();
     setcontextMenu(false);
     callback();

  }

  //-------------------------------------------basic render of context menu----------------------------------------------------
  return (
    <div 
     className={`bg-dropdown-background fixed py-2 z-[100]   shadow-xl`}
     ref={contextMenuRef}
     style={{
      top:coordinates.y,
      left:coordinates.x
     }}
     >
    <ul>
      {
        options.map(({name,callback})=>(
          <li className="px-5 py-1 cursor-pointer hover:bg-background-default-hover" key={name}  onClick={(e)=>handleClick(e,callback)}>
          <span className="text-white">{name}</span>
          </li>
        ))
      }
    </ul>
    </div>
  )
}
export default ContextMenu;
