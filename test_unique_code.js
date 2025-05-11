const mongoose = require('mongoose');
const Drug = require('./models/Drug');

// Connect to MongoDB (replace with your connection string if different)
// For this test, we'll assume a local MongoDB instance is running.
// If the project has a specific MongoDB setup, that should be used.
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jenghepos_test';

async function runTest() {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB for testing.');

    // Clean up any existing test data with the same code
    await Drug.deleteMany({ code: 'TEST001' });
    console.log('Cleaned up previous test data.');

    const drug1 = new Drug({
      code: 'TEST001',
      name: 'Test Drug 1',
      shortName: 'TD1',
      cost: 10
    });
    await drug1.save();
    console.log('Drug 1 (TEST001) saved successfully.');

    const drug2 = new Drug({
      code: 'TEST001', // Same code as drug1
      name: 'Test Drug 2',
      shortName: 'TD2',
      cost: 20
    });

    try {
      await drug2.save();
      console.error('Error: Drug 2 (TEST001) saved, but should have failed due to unique constraint.');
      process.exitCode = 1; // Indicate test failure
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        console.log('Success: Attempt to save Drug 2 (TEST001) failed as expected due to duplicate code.');
      } else {
        console.error('Error: Saving Drug 2 failed, but not due to unique constraint:', error);
        process.exitCode = 1; // Indicate test failure
      }
    }

  } catch (err) {
    console.error('Test script error:', err);
    process.exitCode = 1; // Indicate test failure
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

runTest();

