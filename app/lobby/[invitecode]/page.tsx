"use client";

import { useLobby } from "@/hooks/use-lobbies";
import { useScriptStore } from "@/hooks/use-scripts";
import { ModalType, useModal } from "@/hooks/use-modal";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRef, useEffect, useState } from "react";
import Seats from "@/components/seats";

type Position = {
  x:number,
  y:number
}

export default function Lobby({ params }: { params: { invitecode: string } }) {

  const lobbyConfig = { maxUsers: 8 }
  const [windowSize, setWindowSize] = useState({width:0,height:0});

  function arrangeObjectsInCircle(numObjects:number, radius:number):Position[] {
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    const angleIncrement = (2 * Math.PI) / numObjects;

    const positions = [];

    for (let i = 0; i < numObjects; i++) {
      const angle = i * angleIncrement;
      const x = Math.floor(centerX + radius * Math.cos(angle));
      const y = Math.floor(centerY + radius * Math.sin(angle));
      positions.push({ x, y });
    }

    return positions;
  }

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = Math.min(windowSize.width, windowSize.height)/2.8;
  const seatPositions = arrangeObjectsInCircle(lobbyConfig.maxUsers, radius);
  const seatSize = 2*Math.PI*radius/lobbyConfig.maxUsers*.9;


  return (
    <div>
      <div>My Post: {params.invitecode}</div>
      {seatPositions.map((ele, index) => {
        console.log(index)
        return<div className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{top:ele.y, left:ele.x}} key={index}><Seats index={index} size={seatSize} /></div>
      })}
    </div>
  );
}
