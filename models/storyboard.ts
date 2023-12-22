import mongoose, { Schema } from "mongoose";

export type StoryBoard = {
  mainroomId: number;
  roleTokenIds: number[];
};

const storyBoardSchema = new Schema<StoryBoard>({
    mainroomId: { type: Number, required: true },
    roleTokenIds: { type: [Number], required: true },
});

const StoryBoard =
  mongoose.models.StoryBoard || mongoose.model("StoryBoard", storyBoardSchema);

export default StoryBoard;
