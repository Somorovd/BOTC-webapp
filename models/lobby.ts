import mongoose, { Schema } from "mongoose";

export type Lobby = {
  name: string;
  inviteCode: string;
};

const lobbySchema = new Schema<Lobby>({
  name: { type: String, required: true },
  inviteCode: { type: String },//TOOK OUT REQUIRED TRUE FOR TESTING
});

const LobbyModel =
  mongoose.models.Lobby || mongoose.model("Lobby", lobbySchema);

export default LobbyModel;
