const Booking = require("../models/Booking");
const User = require("../models/User");

// const createComment = async (req, res, next) => {
//   try {
//     const data = req.body;
//     const newComment = new Comment({
//       user: data.user,
//       content: data.content,
//       votes: data.votes,
//     });
//     await newComment.save();
//     res.status(201).json(newComment);
//   } catch (error) {
//     res.status(400).json({ error: `Error: ${error}` });
//   }
// };

const getBookingByUserID = async (req, res, next) => {
  try {
    const userID = req.params.userId;

    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const booking = await Booking.findOne({ user: userID })
        .populate("user")
        .populate("event");

      const result = {
        name: booking.user?.name,
        bookings: booking.event?.map((e) => {
          return {
            eventName: e?.name,
            eventDate: e?.date,
            quatityTicket: booking?.quantity,
          };
        }),
      };
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "User not found" });
  }
};

const getBookingByBookingID = async (req, res, next) => {
  try {
    const bookingID = req.params.bookingId;

    const bookingSearch = await Booking.findById(bookingID);

    if (!bookingSearch) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = await Booking.findOne({ _id: bookingID })
      .populate("user", "name email")
      .populate("event", "name date location");

    const userBooking = booking.user;
    const eventBooking = booking.event;

    const result = {
      bookingId: booking._id,
      userInfo: {
        name: userBooking.name,
        email: userBooking.email,
      },
      eventInfo: {
        name: eventBooking[0].name,
        date: eventBooking[0].date,
        location: eventBooking[0].location,
      },
      numberOfTickets: booking.quantity,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error: ${error}` });
  }
};

const getAllBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("user").populate("event");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: `Error: ${error}` });
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: `Error: ${error}` });
  }
};

const createBooking = async (req, res, next) => {
  try {
    const data = req.body;

    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const booking = new Booking({
      user: data.userId,
      event: data.eventId,
      quatity: data.quantity,
    });

    await booking.save;

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: `Error: ${error}` });
  }
};

// const getCommentsByAuthorID = async (req, res, next) => {
//   try {
//     const { slug } = req.params;

//     const comments = await Comment.find({ user: slug });

//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(400).json({ error: `Error: ${error}` });
//   }
// };

module.exports = {
  getBookingByUserID,
  getAllBooking,
  getAllUser,
  getBookingByBookingID,
  createBooking,
};
