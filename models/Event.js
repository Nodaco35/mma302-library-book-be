const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  location: String,
  availableTickets: Number,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
