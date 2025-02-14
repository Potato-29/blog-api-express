const mongoose = require("mongoose");
const blogModel = require("../models/blog.model"); // Adjust the path as necessary
const dotenv = require("dotenv");
dotenv.config();

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "blog-site",
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

async function seedBlogs(numBlogs) {
  const dummyBlogs = [];

  for (let i = 1; i <= numBlogs; i++) {
    dummyBlogs.push({
      title: `Blog Post ${i}`,
      content: `This is the content of blog post number ${i}.`,
      author: `Author ${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      reads: Math.floor(Math.random() * 300) + 1,
    });
  }

  try {
    await blogModel.insertMany(dummyBlogs);
    console.log(`${numBlogs} dummy blogs seeded successfully!`);
  } catch (error) {
    console.error("Error seeding blogs:", error);
  }
}

const numBlogs = parseInt(process.argv[2], 10) || 3; // Default to 3 if no argument is provided

// Connect to the database and then seed blogs
connectDB()
  .then(() => {
    seedBlogs(numBlogs);
  })
  .catch((error) => {
    console.error("Error during seeding process:", error);
  });
