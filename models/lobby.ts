import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { RoomUser, roomUserSchema } from "./roomuser";

type Seat = RoomUser | null;

export type Lobby = {
  _id: ObjectId | string;
  name: string;
  inviteCode: string;
  maxUsers: number;
  numCurrentUsers: number;
  seats: Seat[];
};

export const lobbySchema = new Schema<Lobby>({
  name: { type: String, required: true },
  inviteCode: { type: String, required: true },
  maxUsers: { type: Number, required: true },
  seats: { type: [roomUserSchema], required: true },
});

const LobbyModel =
  mongoose.models.Lobby || mongoose.model("Lobby", lobbySchema);

export default LobbyModel;
