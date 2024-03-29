"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var script_1 = require("../script");
var dotenv = require("dotenv");
var roletokens_1 = require("../roletokens");
var roomuser_1 = require("../roomuser");
var lobby_1 = require("../lobby");
// Load environment variables from a file named .env
dotenv.config();
// console.log('wertwertwertwertwertwertwertwertwertwertwert',process.env.MONGODB_URI)
var connectMongoDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var lobbySeedData_1, seedData_1, seedData1_1, roomuserSeedData_1, seedDataToMongoDB, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                //Hardcoded!!!!!! NEED TO FIX!!!!!!!!!!!
                return [4 /*yield*/, mongoose_1.default.connect("mongodb+srv://matthewryanboyer123:8eKlQADKnVw2pjdn@clusterbotc.nmimvsn.mongodb.net/BOTC-HACKATHON")];
            case 1:
                //Hardcoded!!!!!! NEED TO FIX!!!!!!!!!!!
                _a.sent();
                console.log('Connected to MongoDB');
                lobbySeedData_1 = [
                    {
                        name: 'Test Lobby',
                        inviteCode: "test",
                        messagesId: 5
                    }
                ];
                seedData_1 = [
                    {
                        name: 'Test Script 1',
                        picUrl: 'https://preview.redd.it/various-custom-full-scripts-7-15-players-3-core-14-custom-v0-77x00glowt691.jpg?width=2550&format=pjpg&auto=webp&s=7bc2094b089aae1840fbc263c35a1e7feaf190f3',
                    },
                    {
                        name: 'Test Script 2',
                        picUrl: 'https://preview.redd.it/first-script-feedback-v0-mo2o6xczh11a1.png?auto=webp&s=09a7da2e66731c9da1a4e46a84c6ed809d32b392',
                    },
                ];
                seedData1_1 = [
                    {
                        name: 'Test RoleToken 1',
                        description: "this role does a bunch of cool stuff and you save everyone",
                        picUrl: 'https://i.redd.it/q54664kmnyq91.jpg',
                    },
                    {
                        name: 'Test RoleToken 2',
                        description: "you do nothing all day everyday but sit in your chair and dont talk to anyone ever!!!",
                        picUrl: 'https://i.redd.it/m5lhwp2h74rb1.png',
                    },
                ];
                roomuserSeedData_1 = [
                    {
                        username: 'Daniel',
                        roletokenId: {},
                        mainroomId: {},
                        isStoryTeller: true,
                        notes: 'test string notes'
                    }
                ];
                seedDataToMongoDB = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 9, , 10]);
                                return [4 /*yield*/, script_1.default.deleteMany()];
                            case 1:
                                _a.sent(); // Remove existing data
                                return [4 /*yield*/, roletokens_1.default.deleteMany()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, lobby_1.default.deleteMany()];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, roomuser_1.default.deleteMany()];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, script_1.default.insertMany(seedData_1)];
                            case 5:
                                _a.sent(); // Insert new seed data
                                return [4 /*yield*/, roletokens_1.default.insertMany(seedData1_1)];
                            case 6:
                                _a.sent();
                                return [4 /*yield*/, lobby_1.default.insertMany(lobbySeedData_1)];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, roomuser_1.default.insertMany(roomuserSeedData_1)];
                            case 8:
                                _a.sent();
                                console.log('Seed data added successfully');
                                return [3 /*break*/, 10];
                            case 9:
                                error_2 = _a.sent();
                                console.error('Error seeding data:', error_2);
                                return [3 /*break*/, 10];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); };
                // Run the seed function
                return [4 /*yield*/, seedDataToMongoDB()];
            case 2:
                // Run the seed function
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                console.error('Error connecting to MongoDB\n', error_1);
                return [3 /*break*/, 5];
            case 4:
                mongoose_1.default.disconnect(); // Disconnect from MongoDB
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Wrap in an async function and call it to avoid issues with top-level await in TypeScript
var runSeed = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectMongoDB()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
runSeed();
