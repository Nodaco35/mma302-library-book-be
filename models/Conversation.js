const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    participantIds: { type: [Number], required: true },
    participantNames: { type: [String], default: [] },
    lastMessage: { type: String, default: "" },
    lastMessageAt: { type: String, default: "" },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
