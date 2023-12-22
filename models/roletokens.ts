import mongoose, {Schema} from "mongoose";

export type RoleToken = {
    name: string,
    description: string,
    user_id: number,
    status: string,
    picUrl: string
}

const roleTokenSchema = new Schema<RoleToken>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    user_id: {type: Number},
    status: {type: String},
    picUrl: {type: String}
  });

  const RoleToken = mongoose.models.RoleToken || mongoose.model("RoleToken", roleTokenSchema);

  export default RoleToken;
