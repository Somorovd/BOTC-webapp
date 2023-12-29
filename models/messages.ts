import mongoose, {Schema,Types} from "mongoose";

export type Messages = {
    lobbyId: object,
    userId: object,
    text: string
}

const messagesSchema = new Schema<Messages>({
    lobbyId: { type: mongoose.Types.ObjectId, ref:"Lobby" },
    userId: {type: mongoose.Types.ObjectId, ref:"RoomUser"},
    text: {type: String}
  },{timestamps:true});

  const Messages = mongoose.models.Messages || mongoose.model("Messages", messagesSchema);

  export default Messages;
