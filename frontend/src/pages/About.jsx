import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28 pb-12">
        <div className="bg-base-100 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-3">About BookStore</h1>
          <p className="text-base-content/80">
            BookStore is a simple MERN demo that lets you browse free and paid books
            stored in MongoDB. It includes a working backend API and a React UI
            connected to your local database.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;

