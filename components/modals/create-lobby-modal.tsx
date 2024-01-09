"use client";

import { useLobbies } from "@/hooks/use-lobbies";
import { useModal } from "@/hooks/use-modal";
import { ChangeEvent, useEffect, useState } from "react";
import Dialog from "../ui/dialog";
import { useRouter } from "next/navigation";
import { Lobby } from "@/models/lobby";

type LobbyForm = {
  name: string;
  maxUsers: string;
};

const defaultForm: LobbyForm = {
  name: "",
  maxUsers: "10",
};

const CreateLobbyModal = () => {
  const { isOpen, onClose } = useModal();
  const { addLobby } = useLobbies();
  const router = useRouter();

  const [lobbyForm, setLobbyForm] = useState<LobbyForm>({ ...defaultForm });
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLobbyForm({ ...defaultForm });
      setIsWaiting(false);
    }
  }, [isOpen]);

  const handleLobbyFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLobbyForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsWaiting(true);
    const res = await fetch("/api/lobbies", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lobbyForm),
    });
    const { lobby }: { lobby: Lobby } = await res.json();

    if (lobby) {
      addLobby(lobby);
      onClose();
      router.push(`/lobby/${lobby._id}`);
    } else {
      console.log("Error creating lobby");
      setIsWaiting(false);
    }
  };

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
            name="name"
            autoFocus
            value={lobbyForm?.name}
            onChange={handleLobbyFormChange}
            className="border-black border-[1px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxUsers">
            Number of Players:{" "}
            <span className="font-bold">{lobbyForm.maxUsers}</span>
          </label>
          <input
            type="range"
            id="maxUsers"
            name="maxUsers"
            value={lobbyForm?.maxUsers}
            onChange={handleLobbyFormChange}
            className="border-black border-[1px]"
            min={5}
            max={20}
          />
        </div>
        <button
          className="hover:bg-slate-300 border-2 border-black"
          disabled={isWaiting}
        >
          Create
        </button>
      </form>
    </Dialog>
  );
};

export default CreateLobbyModal;
