const express = require("express");
const {
  getAllEvent,
} = require("../controller/EventController");
const router = express.Router();

router.get("/", getAllEvent);


module.exports = router;
