"use client";

import { useEffect, useState } from "react";
import Seats from "@/components/seats";
import { Lobby } from "@/models/lobby";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {Peer} from 'peerjs'

type Position = {
  x: number;
  y: number;
};

export default function Lobby({ params }: { params: { id: string } }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [peerId, setPeerId] = useState('null');
  const router = useRouter();
  const { user } = useUser();
  const test = 'testttttttt';

  useEffect(() => {
    const peer = new Peer(test);
    peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    setPeerId(id)
    });
    return (() => {
      peer.disconnect()

        // Cleanup or disconnect logic if needed
        peer.destroy();

    })
  },[])

  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({video:true}, function (mediaStream) {
      const call = peer.call(remotePeerId, mediaStream)
    })
  }

  useEffect(() => {
    fetch(`/api/lobbies/${params.id}`)
      .then((res) => res.json())
      .then((resBody) => {
        setLobby(resBody.lobby);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(`Error fetching lobby: ${error}`);
      });
  }, []);

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

// Call a peer, providing our mediaStream
// var call = peer.call('dest-peer-id',
// mediaStream);


  if (!isLoading && !lobby) {
    return router.push("/");
  } else if (!lobby) {
    return null;
  }

  const ringScale = 0.95;
  const seatScale = 0.8;

  const radius =
    (0.5 * Math.min(windowSize.width, windowSize.height) * ringScale) /
    (1 + (Math.PI * ringScale * seatScale) / lobby.maxUsers);
  const seatSize = ((2 * Math.PI * radius) / lobby.maxUsers) * seatScale;

  const seatPositions = arrangeObjectsInCircle(lobby.maxUsers, radius);

  return (
    <div>
      <div>My Post: {params.id}</div>
      {seatPositions.map((ele, index) => {
        // user = lobby.users[index];
        return (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: ele.y, left: ele.x }}
            key={index}
          >
            <Seats
              index={index}
              size={seatSize}
              seatUser={lobby.users[index] || null}
            />
          </div>
        );
      })}
    </div>
  );
}
