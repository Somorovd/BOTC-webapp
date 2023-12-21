import mongoose from 'mongoose';
import ScriptModel from "../script"

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Seed data
    const seedData = [
      {
        name: 'Test Script 1',
        pic_url: 'https://example.com/image1.jpg',
      },
      {
        name: 'Test Script 2',
        pic_url: 'https://example.com/image2.jpg',
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

export default connectMongoDB;
