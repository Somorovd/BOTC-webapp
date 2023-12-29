"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var lobbySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    inviteCode: { type: String }, //TOOK OUT REQUIRED TRUE FOR TESTING
    messagesId: { type: Number }
});
var LobbyModel = mongoose_1.default.models.Lobby || mongoose_1.default.model("Lobby", lobbySchema);
exports.default = LobbyModel;
