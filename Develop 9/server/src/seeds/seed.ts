
import db from "../config/connection.js";
import cleanDB from "./cleanDB.js";
import User from "../models/User.js";
import userData from  './userData.json' with {type: "json"};


const seedDB = async () => {
  try {
    await db;
    await cleanDB();

    await User.insertMany(userData);

    console.log("Data seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seedDB();