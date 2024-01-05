"use strict";
exports.__esModule = true;
exports.roomUserSchema = void 0;
var mongoose_1 = require("mongoose");
exports.roomUserSchema = new mongoose_1.Schema({
    // lobbyId: { type: mongoose.Types.ObjectId, ref:"Lobby" },
    username: { type: String, required: true }
});
var RoomUser = mongoose_1["default"].models.RoomUser || mongoose_1["default"].model("RoomUser", exports.roomUserSchema);
exports["default"] = RoomUser;
