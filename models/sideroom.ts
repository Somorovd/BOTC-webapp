import mongoose, {Schema} from "mongoose";

export type SideRoom = {
    userId: number[],
    mainroomId: number,
}

const sideRoomSchema = new Schema<SideRoom>({
    userId: {type: [Number]},
    mainroomId: {type: Number}
  });

  const SideRoom = mongoose.models.SideRoom || mongoose.model("SideRoom", sideRoomSchema);

  export default SideRoom;
