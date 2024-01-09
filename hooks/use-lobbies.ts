import { type Lobby } from "@/models/lobby";
import { create } from "zustand";

interface LobbiesStore {
  lobbies: Lobby[];
  addLobby: (lobby: Lobby) => void;
  fetchLobbies: () => Promise<void>;
}

export const useLobbies = create<LobbiesStore>((set, get) => ({
  lobbies: [],
  addLobby: (lobby) => {
    const lobbies = [...get().lobbies, lobby];
    set({ lobbies });
  },
  fetchLobbies: async () => {
    const res = await fetch("/api/lobbies", { cache: "no-store" });
    const { lobbies } = await res.json();
    set({ lobbies });
  },
}));
