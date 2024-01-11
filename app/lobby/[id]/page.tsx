"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { EventDataMap, EventMessage, LobbyEvent } from "@/party/lobby-server";
import { useLobby } from "@/hooks/use-lobby";
import { LiveKitRoom } from "@livekit/components-react";
import LobbyVideoConference from "@/components/lobby/lobby-video-conference";

type LobbyCredentials = {
  id: string;
  name: string;
};

export default function LobbyPage({ params }: { params: { id: string } }) {
  const { fetchLobby, addUser, removeUser } = useLobby();
  const [lobbyCreds, setLobbyCreds] = useState<LobbyCredentials | null>(null);

  const { user: self } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const router = useRouter();

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    party: "lobby",
    room: params.id,
  });

  useEffect(() => {
    if (!socket) return;

    const onEvent = (msg: EventMessage<any>) => {
      switch (msg.event) {
        case LobbyEvent.PlayerJoined: {
          const { user } = msg.data as EventDataMap[LobbyEvent.PlayerJoined];
          addUser(user);
          break;
        }
        case LobbyEvent.PlayerLeft: {
          const { user } = msg.data as EventDataMap[LobbyEvent.PlayerLeft];
          console.log(`HERE ${user.username} LEFT`);
          removeUser(user);
          break;
        }
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
    if (!socket || !self || !isLoading) return;

    (async () => {
      const lobby = await fetchLobby(params.id);

      if (!lobby) {
        console.log("Error fetching lobby");
        return;
      }

      const user = lobby.seats.find((user) => user?.username === self.username);
      if (!user) {
        console.log("Unauthorized User in Lobby");
        return router.push("/");
      }

      const joinEvent: EventMessage<LobbyEvent.PlayerJoined> = {
        type: "event",
        event: LobbyEvent.PlayerJoined,
        data: {
          user: user,
        },
      };

      setIsLoading(false);
      setLobbyCreds({ name: lobby.name, id: `${lobby._id}` });
      socket.send(JSON.stringify(joinEvent));
    })();
  }, [socket, self]);

  useEffect(() => {
    if (!lobbyCreds || !self) return;

    const room = `${lobbyCreds.name}::${lobbyCreds.id}`;
    const username = self.username;

    console.log("livekit room", room);

    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${username}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [lobbyCreds, self]);

  if (!isLoading && !lobbyCreds) {
    return router.push("/");
  } else if (!lobbyCreds) {
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
      <LobbyVideoConference />
    </LiveKitRoom>
  );
}
