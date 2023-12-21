"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/script.ts
var mongoose_1 = require("mongoose");
var scriptSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    picUrl: { type: String, required: true },
});
// const ScriptModel = model<Script>('Script', scriptSchema);
var Script = mongoose_1.default.models.Script || mongoose_1.default.model("Script", scriptSchema);
exports.default = Script;
// const script1 = new Script({
//     name: 'Test Script',
//     pic_url: 'https://preview.redd.it/various-custom-full-scripts-7-15-players-3-core-14-custom-v0-77x00glowt691.jpg?width=2550&format=pjpg&auto=webp&s=7bc2094b089aae1840fbc263c35a1e7feaf190f3'
// });
// const savedScript = await script1.save();
// return savedScript;
// const ScriptModel =
//   mongoose.models.Script || mongoose.model("Script", scriptSchema);
// export default ScriptModel;
