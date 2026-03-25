import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getLocalBookCover } from "../utils/bookCover";

function readCart() {
  const raw = localStorage.getItem("cart");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function Cart() {
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | processing | success
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    setCart(readCart());
  }, []);

  const total = useMemo(
    () =>
      cart.reduce((sum, item) => sum + Number(item?.price || 0), 0),
    [cart]
  );

  const saveCart = (next) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
    // Let navbar/cart update immediately in the same tab.
    window.dispatchEvent(new CustomEvent("bookCartUpdated"));
  };

  const handleRemove = (id) => {
    const next = cart.filter((x) => (x?.id || "").toString() !== id);
    saveCart(next);
    toast.success("Removed from cart");
  };

  const handleClear = () => {
    saveCart([]);
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    setPaymentStatus("idle");
    setCheckoutOpen(true);
  };

  const validate = () => {
    const fullNameOk = form.fullName.trim().length >= 2;
    const emailOk = /.+@.+\..+/.test(form.email.trim());
    const addressOk = form.address.trim().length >= 5;

    const cardDigits = form.cardNumber.replace(/\s+/g, "");
    const cardOk = /^\d{12,19}$/.test(cardDigits);

    const expiryOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry.trim());

    const cvvOk = /^\d{3,4}$/.test(form.cvv.replace(/\s+/g, ""));

    return fullNameOk && emailOk && addressOk && cardOk && expiryOk && cvvOk;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!validate()) {
      toast.error("Please check your payment details.");
      return;
    }

    setPaymentStatus("processing");

    // Fake payment processing
    setTimeout(() => {
      setPaymentStatus("success");
      toast.success("Payment completed!");

      const order = {
        id: `ORD-${Date.now()}`,
        items: cart,
        total,
        buyer: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
        },
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("lastOrder", JSON.stringify(order));
      saveCart([]);
      setCheckoutOpen(false);
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28 pb-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <div className="flex gap-2">
            <button
              className="btn btn-ghost"
              onClick={handleClear}
              disabled={!cart.length}
            >
              Clear
            </button>
            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              disabled={!cart.length}
            >
              Checkout
            </button>
          </div>
        </div>

        {!cart.length ? (
          <div className="bg-base-100 rounded-lg shadow-md p-6">
            <p className="text-base-content/80">Your cart is empty.</p>
          </div>
        ) : (
          <div className="bg-base-100 rounded-lg shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={(item?.id || item?.name || item?.title) ?? Math.random()}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={getLocalBookCover(item)}
                            alt={item?.name || "Book"}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <div className="font-semibold">
                              {item?.name || "Book"}
                            </div>
                            <div className="text-sm opacity-70">
                              {item?.title || ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item?.category || "-"}</td>
                      <td>${Number(item?.price || 0)}</td>
                      <td className="text-right">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleRemove((item?.id || "").toString())}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-5">
              <div className="text-right">
                <div className="opacity-70">Total</div>
                <div className="text-2xl font-bold">${total}</div>
              </div>
            </div>

            {checkoutOpen && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

                {paymentStatus === "success" ? (
                  <div className="bg-success/10 text-success p-4 rounded-lg">
                    Payment completed successfully.
                  </div>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text">Full name</span>
                        </div>
                        <input
                          className="input input-bordered"
                          value={form.fullName}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              fullName: e.target.value,
                            }))
                          }
                          placeholder="John Doe"
                        />
                      </label>

                      <label className="form-control">
                        <div className="label">
                          <span className="label-text">Email</span>
                        </div>
                        <input
                          className="input input-bordered"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          placeholder="you@example.com"
                        />
                      </label>
                    </div>

                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">Address</span>
                      </div>
                      <input
                        className="input input-bordered"
                        value={form.address}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Street, City, Country"
                      />
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text">Card number</span>
                        </div>
                        <input
                          className="input input-bordered"
                          value={form.cardNumber}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              cardNumber: e.target.value,
                            }))
                          }
                          placeholder="4242 4242 4242 4242"
                        />
                      </label>

                      <label className="form-control">
                        <div className="label">
                          <span className="label-text">Expiry (MM/YY)</span>
                        </div>
                        <input
                          className="input input-bordered"
                          value={form.expiry}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              expiry: e.target.value,
                            }))
                          }
                          placeholder="08/28"
                        />
                      </label>
                    </div>

                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">CVV</span>
                      </div>
                      <input
                        className="input input-bordered"
                        value={form.cvv}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            cvv: e.target.value,
                          }))
                        }
                        placeholder="123"
                      />
                    </label>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="btn btn-secondary"
                        disabled={paymentStatus === "processing"}
                      >
                        {paymentStatus === "processing"
                          ? "Processing..."
                          : `Pay $${total}`}
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => setCheckoutOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;

