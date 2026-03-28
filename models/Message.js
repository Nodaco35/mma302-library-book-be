const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    conversationId: { type: Number, required: true },
    senderId: { type: Number, required: true },
    receiverId: { type: Number, required: true },
    content: { type: String, required: true },
    createdAt: { type: String, default: "" },
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

module.exports = mongoose.model("Message", messageSchema);
