const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { createResourceRouter } = require("./routes/resourceRouter");

const User = require("./models/User");
const Book = require("./models/Book");
const BorrowRequest = require("./models/BorrowRequest");
const BorrowRecord = require("./models/BorrowRecord");
const Category = require("./models/Category");
const Payment = require("./models/Payment");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  "/users",
  createResourceRouter(User, {
    numericFields: ["id"],
  })
);
app.use(
  "/books",
  createResourceRouter(Book, {
    numericFields: ["id", "totalCopies", "availableCopies"],
  })
);
app.use(
  "/borrowRequests",
  createResourceRouter(BorrowRequest, {
    numericFields: ["id", "bookId", "userId", "approvedBy"],
  })
);
app.use(
  "/borrowRecords",
  createResourceRouter(BorrowRecord, {
    numericFields: ["id", "requestId", "bookId", "userId"],
  })
);
app.use(
  "/categories",
  createResourceRouter(Category, {
    numericFields: ["id"],
  })
);
app.use(
  "/payments",
  createResourceRouter(Payment, {
    numericFields: ["id", "amount"],
  })
);
app.use(
  "/conversations",
  createResourceRouter(Conversation, {
    numericFields: ["id", "participantIds"],
  })
);
app.use(
  "/messages",
  createResourceRouter(Message, {
    numericFields: ["id", "conversationId", "senderId", "receiverId"],
  })
);

app.get("/", async (req, res) => {
  res.send({ message: "Welcome to NoCoCo API" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
