"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roleTokenSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    user_id: { type: mongoose_1.default.Types.ObjectId, ref: "RoomUser" },
    status: { type: String },
    picUrl: { type: String }
});
var RoleToken = mongoose_1.default.models.RoleToken || mongoose_1.default.model("RoleToken", roleTokenSchema);
exports.default = RoleToken;
