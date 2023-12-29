import mongoose, { Schema } from "mongoose";

export type StoryBoard = {
  lobbyId: object,
  roleTokenIds: [object],
};

const storyBoardSchema = new Schema<StoryBoard>({
  lobbyId: { type: mongoose.Types.ObjectId, ref:"Lobby" },
    roleTokenIds: [{ type: mongoose.Types.ObjectId, ref:"RoleToken" }],
});

const StoryBoard =
  mongoose.models.StoryBoard || mongoose.model("StoryBoard", storyBoardSchema);

export default StoryBoard;
