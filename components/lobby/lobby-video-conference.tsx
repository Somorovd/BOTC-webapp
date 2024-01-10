"use client";

import { Lobby } from "@/models/lobby";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import Seat from "../seat";
import { useLobby } from "@/hooks/use-lobby";

type Position = {
  x: number;
  y: number;
};

export default function LobbyVideoConference() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [seatPositions, setSeatPositions] = useState<Position[]>([]);
  const [seatSize, setSeatSize] = useState(0);
  const lobbySize = useLobby((state) => state.lobby?.maxUsers);
  const tracks = useTracks([Track.Source.Camera]);

  const ringScale = 0.95;
  const seatScale = 0.8;

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

  useEffect(() => {
    if (!lobbySize) {
      return setSeatPositions([]);
    }

    const radius =
      (0.5 * Math.min(windowSize.width, windowSize.height) * ringScale) /
      (1 + (Math.PI * ringScale * seatScale) / lobbySize);

    setSeatSize(((2 * Math.PI * radius) / lobbySize) * seatScale);
    setSeatPositions(arrangeObjectsInCircle(lobbySize, radius));
  }, [windowSize, lobbySize]);

  // const seatUsers = new Array(lobby.maxUsers).fill(null);
  // const seatTracks = new Array(lobby.maxUsers).fill(null);

  // for (let user of Object.values(lobby.users)) {
  //   seatUsers[user.seat] = user;
  // }

  // for (let track of tracks) {
  //   const username = track.participant.identity;
  //   if (!username) return;

  //   seatTracks[lobby.users[username].seat] = track;
  // }

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
              // seatUser={seatUsers[index]}
              // videoTrackRef={seatTracks[index]}
            />
          </div>
        );
      })}
    </div>
  );
}
