import mongoose from 'mongoose';
import ScriptModel from '../script';
import * as dotenv from 'dotenv';


// Load environment variables from a file named .env
dotenv.config();

// console.log('wertwertwertwertwertwertwertwertwertwertwert',process.env.MONGODB_URI)
const connectMongoDB = async () => {
  try {
    //Hardcoded!!!!!! NEED TO FIX!!!!!!!!!!!
    await mongoose.connect("mongodb+srv://matthewryanboyer123:8eKlQADKnVw2pjdn@clusterbotc.nmimvsn.mongodb.net/BOTC-HACKATHON");
    console.log('Connected to MongoDB');

    // Seed data
    const seedData = [
      {
        name: 'Test Script 1',
        picUrl: 'https://example.com/image1.jpg',
      },
      {
        name: 'Test Script 2',
        picUrl: 'https://example.com/image2.jpg',
      },
      // Add more seed data as needed
    ];

    // Function to seed data
    const seedDataToMongoDB = async () => {
      try {
        await ScriptModel.deleteMany(); // Remove existing data
        await ScriptModel.insertMany(seedData); // Insert new seed data
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
