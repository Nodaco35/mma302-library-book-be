const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    userId: { type: String },
    borrowRecordId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "VND" },
    method: { type: String, default: "mock_card" },
    status: { type: String, default: "succeeded" },
    reference: { type: String },
    note: { type: String },
    createdAt: { type: String },
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

module.exports = mongoose.model("Payment", paymentSchema);
