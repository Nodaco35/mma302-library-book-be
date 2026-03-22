const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");

const User = require("../models/User");
const Book = require("../models/Book");
const BorrowRequest = require("../models/BorrowRequest");
const BorrowRecord = require("../models/BorrowRecord");
const Category = require("../models/Category");

const seedDir = path.resolve(__dirname, "..", "seed-data");

function readJson(name) {
  const file = path.join(seedDir, `${name}.json`);
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, "utf8");
  return JSON.parse(content.replace(/^\uFEFF/, ""));
}

async function seedCollection(model, name) {
  try {
    console.log(`Processing ${name}...`);
    const data = readJson(name);
    await model.deleteMany({});
    if (data.length > 0) {
      await model.insertMany(data);
    }
    console.log(`Seeded ${name}: ${data.length} records`);
  } catch (error) {
    console.error(`Error seeding ${name}:`, error.message);
    throw error;
  }
}

async function run() {
  await connectDB();
  await seedCollection(User, "users");
  await seedCollection(Book, "books");
  await seedCollection(BorrowRequest, "borrowRequests");
  await seedCollection(BorrowRecord, "borrowRecords");
  await seedCollection(Category, "categories");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
