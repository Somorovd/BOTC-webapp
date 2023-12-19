// hooks/use-scripts.js
import create from 'zustand';


interface Script {
  _id: string;
  name: string;
  pic_url: string;
}

interface ScriptStore {
  scripts: Script[];
  fetchScripts: () => Promise<void>;
}

export const useScriptStore = create<ScriptStore>((set) => ({
  scripts: [],
  fetchScripts: async () => {
    try {
      const res = await fetch('/api/scripts');
      const { scripts } = await res.json();
      set({ scripts });
    } catch (error) {
      console.error('Error fetching scripts:', error);
    }
  },
}));
