import mongoose, {Schema,Types} from "mongoose";

export type Seat = {
    lobbyId: object,
    userId: object
}

const seatSchema = new Schema<Seat>({
    lobbyId: { type: mongoose.Types.ObjectId, ref:"Lobby" },
    userId: { type: mongoose.Types.ObjectId, ref:"RoomUser" },
  });

  const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);

  export default Seat;
