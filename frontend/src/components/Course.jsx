import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  const [query, setQuery] = useState(localStorage.getItem("bookSearch") || "");

  useEffect(() => {
    const getBook = async () => {
      try {
         
        const res = await axios.get("http://192.168.203.130:4001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  useEffect(() => {
    const handler = (e) => setQuery(e?.detail || "");
    window.addEventListener("bookSearch", handler);
    return () => window.removeEventListener("bookSearch", handler);
  }, []);

  const visibleBooks = (() => {
    const q = query.trim().toLowerCase();
    if (!q) return book;
    return book.filter((b) => {
      const name = (b?.name || "").toLowerCase();
      const title = (b?.title || "").toLowerCase();
      const category = (b?.category || "").toLowerCase();
      return name.includes(q) || title.includes(q) || category.includes(q);
    });
  })();

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Explore our complete course catalog and find your next step with programs designed to build real-world skills.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {visibleBooks.map((item) => (
            <Cards key={item._id || item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
