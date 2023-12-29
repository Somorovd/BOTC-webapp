import mongoose, {Schema} from "mongoose";

export type SideRoom = {
    lobbyId: object,
    userId: object[],
    mainroomId: object,
}

const sideRoomSchema = new Schema<SideRoom>({
    lobbyId: { type: mongoose.Types.ObjectId, ref:"Lobby" },
    userId:[ {type: mongoose.Types.ObjectId, ref:"RoomUser"}],
    mainroomId: {type: mongoose.Types.ObjectId, ref:"Lobby"}
  });

  const SideRoom = mongoose.models.SideRoom || mongoose.model("SideRoom", sideRoomSchema);

  export default SideRoom;
