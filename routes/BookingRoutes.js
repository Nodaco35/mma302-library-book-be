const express = require("express");
const {
  getBookingByUserID,
  getAllBooking,
  getBookingByBookingID,
  createBooking,
} = require("../controller/BookingController");
const router = express.Router();

router.get("/", getAllBooking);

// router.get("/user", getAllUser);

router.get("/:bookingId", getBookingByBookingID);

router.get("/user/:userId", getBookingByUserID);

router.post("/", createBooking);

module.exports = router;
