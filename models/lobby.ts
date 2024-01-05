import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export type Lobby = {
  _id: ObjectId;
  name: string;
  inviteCode: string;
  maxUsers: number;
};

const lobbySchema = new Schema<Lobby>({
  name: { type: String, required: true },
  inviteCode: { type: String, required: true },
  maxUsers: { type: Number, required: true },
});

const LobbyModel =
  mongoose.models.Lobby || mongoose.model("Lobby", lobbySchema);

export default LobbyModel;
