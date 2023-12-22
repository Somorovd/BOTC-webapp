import mongoose, { Schema } from "mongoose";

export type Lobby = {
  _id: string;
  name: string;
  inviteCode: string;
  messagesId: number;
};

const lobbySchema = new Schema<Lobby>({
  name: { type: String, required: true },
  inviteCode: { type: String, required: true },
  messagesId: {type:Number}
});

const LobbyModel =
  mongoose.models.Lobby || mongoose.model("Lobby", lobbySchema);

export default LobbyModel;
