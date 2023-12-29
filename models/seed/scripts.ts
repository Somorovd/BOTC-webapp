import mongoose from 'mongoose';
import ScriptModel from '../script';
import * as dotenv from 'dotenv';
import RoleToken from '../roletokens';
import RoomUser from '../roomuser';
import LobbyModel from '../lobby';


// Load environment variables from a file named .env
dotenv.config();

// console.log('wertwertwertwertwertwertwertwertwertwertwert',process.env.MONGODB_URI)
const connectMongoDB = async () => {
  try {
    //Hardcoded!!!!!! NEED TO FIX!!!!!!!!!!!
    await mongoose.connect("mongodb+srv://matthewryanboyer123:8eKlQADKnVw2pjdn@clusterbotc.nmimvsn.mongodb.net/BOTC-HACKATHON");
    console.log('Connected to MongoDB');

    const lobbySeedData = [
      {
        name: 'Test Lobby',
        inviteCode: "test",
        messagesId: 5
      }
    ];

    const seedData = [
      {
        name: 'Test Script 1',
        picUrl: 'https://preview.redd.it/various-custom-full-scripts-7-15-players-3-core-14-custom-v0-77x00glowt691.jpg?width=2550&format=pjpg&auto=webp&s=7bc2094b089aae1840fbc263c35a1e7feaf190f3',
      },
      {
        name: 'Test Script 2',
        picUrl: 'https://preview.redd.it/first-script-feedback-v0-mo2o6xczh11a1.png?auto=webp&s=09a7da2e66731c9da1a4e46a84c6ed809d32b392',
      },
    ];
    const seedData1 = [
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
    const roomuserSeedData = [
      {
        username:'Daniel',
        roletokenId:{},
        mainroomId:{},
        isStoryTeller: true,
        notes:'test string notes'
      }
    ]

    // Function to seed data
    const seedDataToMongoDB = async () => {
      try {
        await ScriptModel.deleteMany(); // Remove existing data
        await RoleToken.deleteMany();
        await LobbyModel.deleteMany();
        await RoomUser.deleteMany();
        await ScriptModel.insertMany(seedData); // Insert new seed data
        await RoleToken.insertMany(seedData1);
        await LobbyModel.insertMany(lobbySeedData);
        await RoomUser.insertMany(roomuserSeedData);
        console.log('Seed data added successfully');
      } catch (error) {
        console.error('Error seeding data:', error);
      }
    };

    // Run the seed function
    await seedDataToMongoDB();
  } catch (error) {
    console.error('Error connecting to MongoDB\n', error);
  } finally {
    mongoose.disconnect(); // Disconnect from MongoDB
  }
};

// Wrap in an async function and call it to avoid issues with top-level await in TypeScript
const runSeed = async () => {
  await connectMongoDB();
};

runSeed();
export {};
