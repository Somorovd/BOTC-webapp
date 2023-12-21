"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/script.ts
var mongoose_1 = require("mongoose");
var scriptSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    pic_url: { type: String, required: true },
});
var ScriptModel = (0, mongoose_1.model)('Script', scriptSchema);
exports.default = ScriptModel;
// const script1 = new Script({
//     name: 'Test Script',
//     pic_url: 'https://preview.redd.it/various-custom-full-scripts-7-15-players-3-core-14-custom-v0-77x00glowt691.jpg?width=2550&format=pjpg&auto=webp&s=7bc2094b089aae1840fbc263c35a1e7feaf190f3'
// });
// const savedScript = await script1.save();
// return savedScript;
