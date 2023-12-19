import mongoose, { Schema } from "mongoose";

export type Lobby = {
  _id: string;
  name: string;
  inviteCode: string;
};

const lobbySchema = new Schema<Lobby>({
  name: { type: String, required: true },
  inviteCode: { type: String, required: true },
});

const Lobby = mongoose.models.Lobby || mongoose.model("Lobby", lobbySchema);

export default Lobby;
