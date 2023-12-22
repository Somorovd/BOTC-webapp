import mongoose, { Schema } from "mongoose";

export type RoomUser = {
  username: string;
  roleTokenId: number;
  mainroomId: number;
  isStoryTeller: boolean;
  notes: string;
};

const roomUserSchema = new Schema<RoomUser>({
  username: { type: String, required: true },
  roleTokenId: {type:Number},
  mainroomId: {type:Number},
  isStoryTeller: {type:Boolean},
  notes: {type:String}
});

const RoomUser =
  mongoose.models.RoomUser || mongoose.model("RoomUser", roomUserSchema);

export default RoomUser;
