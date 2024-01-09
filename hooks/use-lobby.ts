import { Lobby } from "@/models/lobby";
import { RoomUser } from "@/models/roomuser";
import { ObjectId } from "mongodb";
import { create } from "zustand";

type LobbyStore = Lobby & {
  fetchLobby: (id: string) => Promise<Lobby | null>;
  addUser: (user: RoomUser) => void;
};

export const useLobby = create<LobbyStore>((set, get) => ({
  _id: "",
  name: "",
  inviteCode: "",
  maxUsers: 0,
  users: {},
  fetchLobby: async (id) => {
    const res = await fetch(`/api/lobbies/${id}`);
    const { lobby }: { lobby: Lobby } = await res.json();
    set({ ...lobby });
    return lobby || null;
  },
  addUser: (user) => set({ users: { ...get().users, [user.username]: user } }),
}));
