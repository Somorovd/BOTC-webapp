"use client";

import { useLobby } from "@/hooks/use-lobbies";
import { useModal } from "@/hooks/use-modal";
import { useEffect, useState } from "react";
import Dialog from "../ui/dialog";

const CreateLobbyModal = () => {
  const { isOpen, onClose } = useModal();
  const { addLobby } = useLobby();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/lobbies", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const { lobby } = await res.json();
    addLobby(lobby);
    onClose();
  };

  useEffect(() => {
    setName("");
  }, []);

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="text-lg">
          <h2>Create a new lobby!</h2>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Lobby Name</label>
          <input
            id="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-black border-[1px]"
          />
        </div>
        <button className="hover:bg-slate-300 border-2 border-black">
          Create
        </button>
      </form>
    </Dialog>
  );
};

export default CreateLobbyModal;
