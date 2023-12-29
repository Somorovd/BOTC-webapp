"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roomUserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    roleTokenId: { type: mongoose_1.default.Types.ObjectId, ref: "RoleToken" },
    mainroomId: { type: mongoose_1.default.Types.ObjectId, ref: "Lobby" },
    isStoryTeller: { type: Boolean },
    notes: { type: String }
});
var RoomUser = mongoose_1.default.models.RoomUser || mongoose_1.default.model("RoomUser", roomUserSchema);
exports.default = RoomUser;
