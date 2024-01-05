"use strict";
exports.__esModule = true;
exports.lobbySchema = void 0;
var mongoose_1 = require("mongoose");
var roomuser_1 = require("./roomuser");
exports.lobbySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    inviteCode: { type: String, required: true },
    maxUsers: { type: Number, required: true },
    users: { type: [roomuser_1.roomUserSchema] }
});
var LobbyModel = mongoose_1["default"].models.Lobby || mongoose_1["default"].model("Lobby", exports.lobbySchema);
exports["default"] = LobbyModel;
