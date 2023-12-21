import { type Script } from "@/models/script";
import { create } from "zustand";

interface ScriptStore {
  scripts: Script[];
  fetchScripts: () => Promise<void>;
}

export const useScriptStore = create<ScriptStore>((set) => ({
  scripts: [],
  fetchScripts: async () => {
    const res = await fetch("/api/scripts");
    if (res.ok) {
      const { scripts } = await res.json();
      set({ scripts });
    }
  },
}));
