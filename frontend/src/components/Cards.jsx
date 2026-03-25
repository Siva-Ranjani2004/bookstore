import React from "react";
import { getLocalBookCover } from "../utils/bookCover";
import { toast } from "react-hot-toast";

function Cards({ item }) {
  const handleBuyNow = () => {
    const cartRaw = localStorage.getItem("cart");

    let cart = [];
    if (cartRaw) {
      try {
        cart = JSON.parse(cartRaw);
      } catch {
        cart = [];
      }
    }

    const id = (item?._id || item?.name || item?.title || "").toString();
    if (!id) {
      toast.error("Unable to add this book.");
      return;
    }

    // Store the full book snapshot so it's easy to use later (and not just an id).
    const bookToSave = {
      id,
      name: item?.name || "",
      title: item?.title || "",
      category: item?.category || "",
      price: item?.price || 0,
      image: item?.image || "",
    };

    if (!Array.isArray(cart)) cart = [];

    const exists = cart.some((x) => (x?.id || "").toString() === id);
    const nextCart = exists ? cart : [...cart, bookToSave];

    localStorage.setItem("cart", JSON.stringify(nextCart));
    window.dispatchEvent(new CustomEvent("bookCartUpdated"));

    toast.success(
      `Added "${item?.name || "Book"}" to cart (${nextCart.length})`
    );
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={getLocalBookCover(item)} alt={item.name || "Book"} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <div
                className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                role="button"
                tabIndex={0}
                onClick={handleBuyNow}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleBuyNow();
                }}
              >
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
