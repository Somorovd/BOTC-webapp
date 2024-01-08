"use client";

import { useLobby } from "@/hooks/use-lobbies";
import { useScriptStore } from "@/hooks/use-scripts";
import { ModalType, useModal } from "@/hooks/use-modal";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRef, useEffect } from "react";
import { Lobby } from "@/models/lobby";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const { onOpen } = useModal();
  const { lobbies, fetchLobbies } = useLobby();
  const { scripts, fetchScripts } = useScriptStore();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetchLobbies();
      await fetchScripts();
    })();
  }, [fetchLobbies]);

  const openCreateLobbyModal = () => {
    onOpen(ModalType.CreateLobby);
  };

  const navigateToLobby = async(lobby: Lobby) => {
    const res = await fetch(`/api/lobbies/${lobby._id}/join`,{method:'PUT'});
    if (res.ok) {
      router.push(`/lobby/${lobby._id}`);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-row">
        <div className="flex flex-col">
          {user && (
            <div className="flex gap-4">
              <UserButton />
              <h3>Welcome, {user?.username}!</h3>
            </div>
          )}
        </div>
        <div className="h-full w-[400px]">
          <div className="flex flex-row justify-between items-center">
            <h3>Available Lobbies</h3>
            <span
              onClick={openCreateLobbyModal}
              className="p-2 w-8 bg-blue-400 rounded-md hover:cursor-pointer hover:bg-blue-500 flex justify-center items-center"
            >
              +
            </span>
          </div>
          <div>
            {lobbies.map((lobby, i) => (
              <p
                key={`lobby-${i}`}
                className="p-2 border-[1px] border-slate-500 mb-1 hover:bg-slate-400 "
                onClick={() => navigateToLobby(lobby)}
              >
                {lobby.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
