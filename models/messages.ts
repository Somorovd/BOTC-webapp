import mongoose, {Schema} from "mongoose";

export type Messages = {
    mainroomId: number,
    userId: number,
    text: string
}

const messagesSchema = new Schema<Messages>({
    mainroomId: { type: Number, required: true, unique: true },
    userId: {type: Number, required: true},
    text: {type: String}
  });

  const Messages = mongoose.models.Messages || mongoose.model("Messages", messagesSchema);

  export default Messages;
