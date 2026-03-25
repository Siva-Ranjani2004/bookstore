import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "../model/book.model.js";

dotenv.config();

function normalizeMongoUri(uri) {
  if (!uri) return uri;
  // .env values may be wrapped in quotes: MongoDBURI="mongodb://..."
  return uri.replace(/^"(.*)"$/, "$1");
}

const uri = normalizeMongoUri(process.env.MongoDBURI);

const books = [
  {
    name: "Web Basics",
    category: "Free",
    price: 0,
    title: "Start strong with practical JavaScript fundamentals and clear examples.",
    image: "https://picsum.photos/seed/book-js-basics/400/600",
  },
  {
    name: "React Essentials",
    category: "Free",
    price: 0,
    title: "Build modern UIs with React components, state, and component composition.",
    image: "https://picsum.photos/seed/book-react-essentials/400/600",
  },
  {
    name: "Node.js APIs",
    category: "Free",
    price: 0,
    title: "Learn how to design APIs with Express, routing, and real-world patterns.",
    image: "https://picsum.photos/seed/book-node-apis/400/600",
  },
  {
    name: "CSS Layout",
    category: "Free",
    price: 0,
    title: "Master Flexbox, Grid, and responsive layout techniques for production apps.",
    image: "https://picsum.photos/seed/book-css-layout/400/600",
  },

  {
    name: "Data Structures",
    category: "Paid",
    price: 29,
    title: "Understand core data structures and solve problems with confidence.",
    image: "https://picsum.photos/seed/book-dsa/400/600",
  },
  {
    name: "System Design",
    category: "Paid",
    price: 49,
    title: "Design scalable systems with clear trade-offs and practical architecture ideas.",
    image: "https://picsum.photos/seed/book-system-design/400/600",
  },
  {
    name: "TypeScript",
    category: "Paid",
    price: 39,
    title: "Write safer, cleaner code with types, generics, and modern TS patterns.",
    image: "https://picsum.photos/seed/book-typescript/400/600",
  },
  {
    name: "Database Fundamentals",
    category: "Paid",
    price: 35,
    title: "Learn SQL concepts and database modeling fundamentals you can apply immediately.",
    image: "https://picsum.photos/seed/book-database-fundamentals/400/600",
  },
];

async function main() {
  if (!uri) {
    console.error("Missing MongoDBURI in Backend/.env");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB for seeding");

  // Upsert by a stable key to avoid creating duplicates on repeated runs.
  // We use (name + title) because category/price may change during development.
  const created = [];
  const skipped = [];

  for (const book of books) {
    const existing = await Book.findOne({ name: book.name, title: book.title });
    if (existing) {
      skipped.push(book.title);
      continue;
    }

    const doc = await Book.create(book);
    created.push(doc.title);
  }

  console.log(`Seed complete. Created: ${created.length}, Skipped: ${skipped.length}`);
  await mongoose.connection.close();
  process.exit(0);
}

main().catch(async (err) => {
  console.error("Seed failed:", err);
  try {
    await mongoose.connection.close();
  } catch {}
  process.exit(1);
});

