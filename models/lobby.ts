import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { RoomUser, roomUserSchema } from "./roomuser";

export type Lobby = {
  _id: ObjectId;
  name: string;
  inviteCode: string;
  maxUsers: number;
  users: RoomUser[];
};

export const lobbySchema = new Schema<Lobby>({
  name: { type: String, required: true },
  inviteCode: { type: String, required: true },
  maxUsers: { type: Number, required: true },
  users: { type: [roomUserSchema] },
});

const LobbyModel =
  mongoose.models.Lobby || mongoose.model("Lobby", lobbySchema);

export default LobbyModel;
