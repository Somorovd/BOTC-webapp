import mongoose, { Schema } from "mongoose";

export type Script = {
  _id: string;
  name: string;
  picUrl: string;
};

const scriptSchema = new Schema<Script>({
  name: { type: String, required: true, unique: true },
  picUrl: { type: String, required: true },
});

const ScriptModel =
  mongoose.models.Script || mongoose.model("Script", scriptSchema);

export default ScriptModel;
