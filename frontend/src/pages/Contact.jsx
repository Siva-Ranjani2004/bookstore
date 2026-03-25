import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28 pb-12">
        <div className="bg-base-100 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-3">Contact</h1>
          <p className="text-base-content/80 mb-6">
            Want to contribute books or improve the project? Reach out and we
            will respond soon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Your name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32"
              placeholder="Write your message..."
            />
          </div>
          <button className="btn btn-secondary mt-4">Send Message</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;

