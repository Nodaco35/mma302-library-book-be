const mongoose = require("mongoose");

const borrowRecordSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    requestId: { type: Number, required: true },
    bookId: { type: Number, required: true },
    userId: { type: Number, required: true },
    bookCode: { type: String, required: true },
    borrowDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    returnDate: { type: String, default: null },
    status: { type: String, required: true },
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

module.exports = mongoose.model("BorrowRecord", borrowRecordSchema);
