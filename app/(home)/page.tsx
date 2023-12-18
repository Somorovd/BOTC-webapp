"use client";

import { useLobby } from "@/hooks/use-lobbies";
import { ModalType, useModal } from "@/hooks/use-modal";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRef, useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const { onOpen } = useModal();
  const { lobbies, fetchLobbies } = useLobby();

  useEffect(() => {
    (async () => {
      await fetchLobbies();
    })();
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("Error accessing media devices:", error));
  }, []);

  const openCreateLobbyModal = () => {
    onOpen(ModalType.CreateLobby);
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
          <video ref={videoRef} autoPlay muted className="-scale-x-100 w-fit" />
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
                key={lobby._id}
                className="p-2 border-[1px] border-slate-500 mb-1 hover:bg-slate-400"
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
