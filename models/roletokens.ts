import mongoose, {Schema,Types} from "mongoose";

export type RoleToken = {
    lobbyId: object,
    name: string,
    description: string,
    status: boolean,
    picUrl: string
}

const roleTokenSchema = new Schema<RoleToken>({
    lobbyId: { type: mongoose.Types.ObjectId, ref:"Lobby" },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: {type: Boolean},
    picUrl: {type: String}
  });

  const RoleToken = mongoose.models.RoleToken || mongoose.model("RoleToken", roleTokenSchema);

  export default RoleToken;
