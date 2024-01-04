"use client";

import { useEffect, useState } from "react";
import Seats from "@/components/seats";

type Position = {
  x: number;
  y: number;
};

export default function Lobby({ params }: { params: { invitecode: string } }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const lobbyConfig = { maxUsers: 12 };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function arrangeObjectsInCircle(
    numObjects: number,
    radius: number
  ): Position[] {
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

  const ringScale = 0.95;
  const seatScale = 0.8;

  const radius =
    (0.5 * Math.min(windowSize.width, windowSize.height) * ringScale) /
    (1 + (Math.PI * ringScale * seatScale) / lobbyConfig.maxUsers);
  const seatSize = ((2 * Math.PI * radius) / lobbyConfig.maxUsers) * seatScale;

  const seatPositions = arrangeObjectsInCircle(lobbyConfig.maxUsers, radius);

  return (
    <div>
      <div>My Post: {params.invitecode}</div>
      {seatPositions.map((ele, index) => {
        return (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: ele.y, left: ele.x }}
            key={index}
          >
            <Seats index={index} size={seatSize} />
          </div>
        );
      })}
    </div>
  );
}
