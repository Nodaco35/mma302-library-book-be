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
app.delete("/conversations/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log(`[DELETE] Request to delete conversation ID: ${req.params.id} -> parsed as ${id}`);
    
    if (Number.isNaN(id)) {
      console.log(`[DELETE] Invalid ID: ${req.params.id}`);
      return res.status(400).json({ error: "Invalid id." });
    }

    const msgResult = await Message.deleteMany({ conversationId: id });
    console.log(`[DELETE] Messages deleted: ${msgResult.deletedCount}`);
    
    const result = await Conversation.deleteOne({ id });
    if (!result.deletedCount) {
      console.log(`[DELETE] Conversation not found: ${id}`);
      return res.status(404).json({ error: "Not found." });
    }
    
    console.log(`[DELETE] Conversation deleted successfully: ${id}`);
    return res.status(204).send();
  } catch (error) {
    console.error(`[DELETE] Error deleting conversation ${req.params.id}:`, error);
    return res.status(500).json({ error: error.message });
  }
});
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
