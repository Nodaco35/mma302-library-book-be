const Event = require("../models/Event");

// const createBlog = async (req, res, next) => {
//   try {
//     const data = req.body;
//     const newBlog = new Blog({
//       title: data.title,
//       slug: data.slug,
//       publisher: data.publisher,
//       author: data.author,
//       content: data.content,
//       tags: data.tags,
//       comments: data.comments,
//     });
//     await newBlog.save();
//     res.status(201).json(newBlog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong!" });
//   }
// };

// Cau 1
const getAllEvent = async (req, res, next) => {
  try {
    const events = await Event.find();
    const result = events?.map((event) => {
      return {
        _id: event._id,
        eventName: event.name,
        description: event.description,
        eventDate: event.date,
        eventLocation: event.location,
        numberOfTickets: event.availableTickets,
      };
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error}` });
  }
};

// const addCommentByBlog = async (req, res, next) => {
//   try {
//     const blogID = req.params.blogID;

//     const data = req.body;

//     const newComment = new Comment({
//       user: data.user,
//       content: data.content,
//       votes: data.votes,
//     });

//     await newComment.save();

//     // Thực hiện POST 2 lần: thêm vào Blog, thêm vào comment
//     const blog = await Blog.findByIdAndUpdate(blogID, {
//       $push: { comments: newComment._id },
//     });

//     if (blog) {
//       return res.status(200).json({ message: `Update successfully` });
//     }
//     return res.status(400).json({ message: `Update failed` });
//   } catch (error) {
//     res.status(400).json({ message: `Error: ${error}` });
//   }
// };

module.exports = { getAllEvent };
