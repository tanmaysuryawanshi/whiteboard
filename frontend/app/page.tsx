'use client'
import { useDraw } from "@/hooks/useDraw";
import { drawLine } from "@/utils/drawLine";
import React, { useEffect,useRef } from 'react';
import { io, Socket } from "socket.io-client";
const socket=io('http://localhost:3001')
type DrawLineProps = Draw 
export default function Home() {
  const {canvasRef,onMouseDown,clear}=useDraw(createLine);

  useEffect(() => {
  
   const ctx=canvasRef.current?.getContext('2d');
  
    socket.emit('client-ready')
  
    socket.on('get-canvas-state', (state:string) => {
      if (!canvasRef.current?.toDataURL()) return
      console.log('sending canvas state')
      socket.emit('canvas-state', canvasRef.current.toDataURL())
    })
  
    socket.on('canvas-state-from-server', (state: string) => {
      console.log('I received the state')
      const img = new Image()
     img.src=state
      img.onload = () => {
        console.log("loading image");
        
        ctx?.drawImage(img, 0, 0)
      }
    })
  
    socket.on('draw-line', ({ prevPoint,currentPoint }: DrawLineProps) => {
      if (!ctx) return console.log('no ctx here')
      drawLine({ prevPoint, currentPoint, ctx })
    })
  
    socket.on('clear', clear)
  
    return () => {
      socket.off('draw-line')
      socket.off('get-canvas-state')
      socket.off('canvas-state-from-server')
      socket.off('clear')
    }
  }, [canvasRef])
function createLine({prevPoint,currentPoint,ctx}:Draw){
  socket.emit("draw-line",({prevPoint,currentPoint}))
  drawLine({prevPoint,currentPoint,ctx})
}

  return (
    <div className="w-screen h-screen flex justify-center p-4 items-center bg-black">
      <button type="button" onClick={()=>socket.emit('clear')} className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded text-base leading-none m-4 text-white">
        Clear
      </button>
      <canvas ref={canvasRef} onMouseDown={onMouseDown} width={500} height={500}
      className="border border-black rounded bg-white">

      </canvas>
    </div>
  );
}
