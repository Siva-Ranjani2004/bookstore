import React from "react";
import { Link } from "react-router-dom";
import bookshopImg from "../assets/Image1.jpg";

function Banner() {
  const coverUrl = bookshopImg;

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Explore <span className="text-pink-500">Books</span> you will love
            </h1>
            <p className="text-sm md:text-xl">
              Discover curated free and paid learning resources. Pick a topic,
              open a book, and start building real skills today.
            </p>
          </div>
          <Link to="/course">
            <button className="btn mt-6 btn-secondary">Browse Catalog</button>
          </Link>
        </div>

        <div className="order-1 w-full mt-10 md:w-1/2">
          <img
            src={coverUrl}
            alt="Bookshop"
            className="md:ml-12 w-full md:w-[550px] md:h-[460px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
