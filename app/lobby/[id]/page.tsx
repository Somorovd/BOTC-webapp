"use client";

import { useEffect, useState } from "react";
import Seats from "@/components/seats";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { EventDataMap, EventMessage, LobbyEvent } from "@/party/lobby";
import { useLobby } from "@/hooks/use-lobby";

type Position = {
  x: number;
  y: number;
};

export default function LobbyPage({ params }: { params: { id: string } }) {
  const { fetchLobby, addUser, ...lobby } = useLobby();

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useUser();

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    party: "lobby",
    room: params.id,
  });

  useEffect(() => {
    const onEvent = (msg: EventMessage<any>) => {
      switch (msg.event) {
        case LobbyEvent.PlayerJoined:
          const { user } = msg.data as EventDataMap[LobbyEvent.PlayerJoined];
          addUser(user);
      }
    };

    const onMessage = (event: WebSocketEventMap["message"]) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "event") {
        onEvent(msg);
      }
    };

    socket.addEventListener("message", onMessage);
  }, [socket]);

  useEffect(() => {
    if (!socket || !user || !isLoading) return;

    (async () => {
      const lobby = await fetchLobby(params.id);
      if (!lobby) {
        console.log("Error fetching lobby");
        return;
      }
      if (!lobby.users[user.username!]) {
        console.log("Unauthorized User in Lobby");
        return router.push("/");
      }

      const joinEvent: EventMessage<LobbyEvent.PlayerJoined> = {
        type: "event",
        event: LobbyEvent.PlayerJoined,
        data: {
          user: lobby.users[user.username!],
        },
      };
      socket.send(JSON.stringify(joinEvent));
      setIsLoading(false);
    })();
  }, [socket, user]);

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
  const seatUsers = new Array(lobby.maxUsers).fill(null);

  for (let user of Object.values(lobby.users)) {
    seatUsers[user.seat] = user;
  }

  return (
    <div>
      <div>My Post: {params.id}</div>
      {seatPositions.map((ele, index) => {
        return (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: ele.y, left: ele.x }}
            key={index}
          >
            <Seats index={index} size={seatSize} seatUser={seatUsers[index]} />
          </div>
        );
      })}
    </div>
  );
}
