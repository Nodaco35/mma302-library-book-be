const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    code: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
    totalCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true },
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

module.exports = mongoose.model("Book", bookSchema);
