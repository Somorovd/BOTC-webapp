"use client";

import { Lobby } from "@/models/lobby";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import Seat from "../seat";

type Position = {
  x: number;
  y: number;
};

type LobbyVideoConferenceProps = {
  lobby: Lobby;
};

export default function LobbyVideoConference({
  lobby,
}: LobbyVideoConferenceProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const tracks = useTracks([Track.Source.Camera]);

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
    (1 + (Math.PI * ringScale * seatScale) / lobby.maxUsers);
  const seatSize = ((2 * Math.PI * radius) / lobby.maxUsers) * seatScale;

  const seatPositions = arrangeObjectsInCircle(lobby.maxUsers, radius);
  const seatUsers = new Array(lobby.maxUsers).fill(null);

  for (let user of Object.values(lobby.users)) {
    seatUsers[user.seat] = user;
  }

  console.log("tracks", tracks);
  return (
    <div>
      {seatPositions.map((ele, index) => {
        return (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: ele.y, left: ele.x }}
            key={index}
          >
            <Seat
              index={index}
              size={seatSize}
              seatUser={seatUsers[index]}
              videoTrackRef={tracks[index]}
            />
          </div>
        );
      })}
    </div>
  );
}
