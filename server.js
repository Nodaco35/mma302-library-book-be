const express = require("express");
const app = express();
const EventRouter = require("./routes/EventRoutes");
const BookingRouter = require("./routes/BookingRoutes");
const connectDB = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/events", EventRouter);
app.use("/api/bookings", BookingRouter);

app.get("/", async (req, res) => {
  try {
    res.send({ message: "Welcome to Practical Exam!" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
