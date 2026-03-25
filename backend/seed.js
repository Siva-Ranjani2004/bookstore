const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo:27017/bookstore");

const Book = mongoose.model("Book", {
  name: String,
  price: Number,
  category: String,
  image: String,
  title: String,
});

async function seedData() {
  await Book.deleteMany(); // साफ कर देगा old data

  await Book.insertMany([
    {
      name: "Web Basics",
      price: 0,
      category: "Free",
      image: "https://picsum.photos/seed/book-js-basics/400/600",
      title: "Start strong with practical JavaScript fundamentals and clear examples"
    },
    {
      name: "React Essentials",
      price: 0,
      category: "Free",
      image: "https://picsum.photos/seed/book-react-essentials/400/600",
      title: "Build modern UIs with React components, state, and composition"
    },
    {
      name: "Node.js APIs",
      price: 0,
      category: "Free",
      image: "https://picsum.photos/seed/book-node-apis/400/600",
      title: "Learn how to design APIs with Express and real-world patterns"
    },
    {
      name: "CSS Layout",
      price: 0,
      category: "Free",
      image: "https://picsum.photos/seed/book-css-layout/400/600",
      title: "Master Flexbox, Grid, and responsive layout techniques"
    },
    {
      name: "Data Structures",
      price: 29,
      category: "Paid",
      image: "https://picsum.photos/seed/book-dsa/400/600",
      title: "Understand core data structures and problem solving"
    },
    {
      name: "System Design",
      price: 49,
      category: "Paid",
      image: "https://picsum.photos/seed/book-system-design/400/600",
      title: "Design scalable systems with practical architecture"
    },
    {
      name: "TypeScript",
      price: 39,
      category: "Paid",
      image: "https://picsum.photos/seed/book-typescript/400/600",
      title: "Write safer code using types and modern TS patterns"
    },
    {
      name: "Database Fundamentals",
      price: 35,
      category: "Paid",
      image: "https://picsum.photos/seed/book-database-fundamentals/400/600",
      title: "Learn SQL and database design fundamentals"
    }
  ]);

  console.log("✅ Data Seeded Successfully");
  process.exit();
}

seedData();