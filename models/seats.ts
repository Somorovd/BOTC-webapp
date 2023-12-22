import mongoose, {Schema} from "mongoose";

export type Seat = {
    mainroomId: number,
    userId: number
}

const seatSchema = new Schema<Seat>({
    mainroomId: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
  });

  const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);

  export default Seat;
