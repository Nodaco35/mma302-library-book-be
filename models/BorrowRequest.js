const mongoose = require("mongoose");

const borrowRequestSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    bookId: { type: Number, required: true },
    userId: { type: Number, required: true },
    status: { type: String, required: true },
    requestDate: { type: String, required: true },
    approvedBy: { type: Number, default: null },
    note: { type: String },
    handedOverAt: { type: String },
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

module.exports = mongoose.model("BorrowRequest", borrowRequestSchema);
