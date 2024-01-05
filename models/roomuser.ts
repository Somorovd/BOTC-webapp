import mongoose, { Schema } from "mongoose";

export type RoomUser = {
  // lobbyId: object,
  username: string;
  // roleTokenId: object;
  // mainroomId: object;
  // isStoryTeller: boolean;
  // notes: string;
};

export const roomUserSchema = new Schema<RoomUser>({
  // lobbyId: { type: mongoose.Types.ObjectId, ref:"Lobby" },
  username: { type: String, required: true },
  // roleTokenId: {type:mongoose.Types.ObjectId, ref:"RoleToken"},
  // isStoryTeller: {type:Boolean},
  // notes: {type:String}
});

const RoomUser =
  mongoose.models.RoomUser || mongoose.model("RoomUser", roomUserSchema);

export default RoomUser;
