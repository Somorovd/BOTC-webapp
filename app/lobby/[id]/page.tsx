"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { EventDataMap, EventMessage, LobbyEvent } from "@/party/lobby";
import { useLobby } from "@/hooks/use-lobby";
import { LiveKitRoom } from "@livekit/components-react";
import LobbyVideoConference from "@/components/lobby/lobby-video-conference";

export default function LobbyPage({ params }: { params: { id: string } }) {
  const { fetchLobby, addUser, ...lobby } = useLobby();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const router = useRouter();

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
    if (!lobby) return;

    const room = `${lobby.name}::${lobby._id}`;
    const name = user?.username;

    console.log("livekit room", room);

    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [lobby]);

  if (!isLoading && !lobby) {
    return router.push("/");
  } else if (!lobby) {
    return null;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      style={{ height: "100dvh" }}
    >
      <LobbyVideoConference lobby={lobby} />
    </LiveKitRoom>
  );
}
