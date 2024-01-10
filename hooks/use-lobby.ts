import { Lobby } from "@/models/lobby";
import { RoomUser } from "@/models/roomuser";
import { create } from "zustand";

type LobbyStore = {
  lobby: Lobby | null;
  fetchLobby: (id: string) => Promise<Lobby | null>;
  addUser: (user: RoomUser) => void;
  removeUser: (user: RoomUser) => void;
};

export const useLobby = create<LobbyStore>((set, get) => ({
  lobby: null,
  fetchLobby: async (id) => {
    const res = await fetch(`/api/lobbies/${id}`);
    const { lobby }: { lobby: Lobby } = await res.json();
    set({ lobby });
    return lobby || null;
  },
  addUser: (user) => {
    const lobby = get().lobby;
    if (!lobby) return;
    lobby.seats[user.seat] = user;
    set({ lobby });
  },
  removeUser: (user) => {
    const lobby = get().lobby;
    if (!lobby) return;
    lobby.seats[user.seat] = null;
    set({ lobby });
  },
}));
