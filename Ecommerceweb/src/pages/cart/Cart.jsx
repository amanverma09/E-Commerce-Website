import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import bannerImage from "../../assets/page-banner.jpg";
import { NavLink } from "react-router-dom";
// import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleQuantity = async (id, type) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === id) {
        let newQty = item.quantity;
        if (type === "inc") newQty += 1;
        if (type === "dec" && newQty > 1) newQty -= 1;
        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCartItems(updatedItems);
    const updatedItem = updatedItems.find((i) => i._id === id);

    await axios.put(`http://localhost:5000/api/cart/update/${id}`, {
      quantity: updatedItem.quantity,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // Calculate cart totals
  const calculateTotals = () => {
    const price = cartItems.reduce(
      (total, item) =>
        total +
        (item.productId.originalPrice || item.productId.discountPrice * 1.3) *
          item.quantity,
      0
    );

    const discountPrice = cartItems.reduce(
      (total, item) => total + item.productId.discountPrice * item.quantity,
      0
    );

    const discount = price - discountPrice;
    const protectPromiseFee = cartItems.length * 50; // Example fee calculation

    return {
      price: price.toFixed(2),
      discount: discount.toFixed(2),
      protectPromiseFee: protectPromiseFee.toFixed(2),
      totalAmount: (discountPrice + protectPromiseFee).toFixed(2),
      savings: discount.toFixed(2),
    };
  };

  const totals = calculateTotals();

  return (
    <>
      {/* Banner */}
      <div
        className="page-banner-section d-flex align-items-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="container">
          <div className="page-banner-content text-start">
            <h2 className="title">Cart</h2>
          </div>
        </div>
      </div>

      <section className="cart-section py-5">
        <div className="container">
          <div className="row">
            {/* Cart Items - Left Side */}
            <div className="col-lg-8">
              <div className="cart-header mb-3">
                <h4>Cart ({cartItems.length} items)</h4>
              </div>

              {cartItems.map((item) => (
                <div key={item._id} className="cart-item-card mb-4">
                  <div className="row">
                    <div className="col-md-3 col-4">
                      <NavLink to={`/product/${item.productId._id}`}>
                        <img
                          src={`http://localhost:5000/uploads/${item.productId.images[0]}`}
                          alt={item.productId.name}
                          className="img-fluid cart-item-image"
                        />
                      </NavLink>
                    </div>
                    <div className="col-md-9 col-8">
                      <div className="row">
                        <div className="col-md-7">
                          {/* <h6 className="product-title">
                            {item.productId.name}
                          </h6> */}
                          <NavLink
                            to={`/product/${item.productId._id}`}
                            className="product-title"
                          >
                            {item.productId.name}
                          </NavLink>
                          <p className="product-specs text-muted mb-1 small">
                            {item.productId.description1 ||
                              "Specifications not available"}
                          </p>
                          <p className="seller-info text-muted mb-2 small">
                            Size: {item.productId.size}
                          </p>
                          <div className="delivery-info text-success mb-2">
                            Delivery by{" "}
                            {new Date(
                              Date.now() + 3 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>

                          <div className="d-flex mobile-price-container d-md-none">
                            <div className="price-container">
                              <div className="original-price">
                                $
                                {(
                                  item.productId.originalPrice ||
                                  item.productId.discountPrice * 1.3
                                ).toFixed(2)}
                              </div>
                              <div className="d-flex align-items-center">
                                <span className="discount-price me-2">
                                  ${item.productId.discountPrice.toFixed(2)}
                                </span>
                                <span className="discount-percent">
                                  {Math.round(
                                    (1 -
                                      item.productId.discountPrice /
                                        (item.productId.originalPrice ||
                                          item.productId.discountPrice * 1.3)) *
                                      100
                                  )}
                                  % Off
                                </span>
                              </div>
                              <div className="protect-fee text-muted small">
                                + ${50} Protect Promise Fee
                              </div>
                            </div>
                          </div>

                          <div className="action-buttons mt-2 ">
                            <button className=" btn-save-later">
                              SAVE FOR LATER
                            </button>
                            <button
                              className="btn-remove"
                              onClick={() => handleDelete(item._id)}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>

                        <div className="col-md-5 d-none d-md-block">
                          <div className="price-container">
                            <div className="original-price">
                              $
                              {(
                                item.productId.originalPrice ||
                                item.productId.discountPrice * 1.3
                              ).toFixed(2)}
                            </div>
                            <div className="d-flex align-items-center">
                              <span className="discount-price me-2">
                                ${item.productId.discountPrice.toFixed(2)}
                              </span>
                              <span className="discount-percent">
                                {item.productId.discountPercentage}% Off
                              </span>
                            </div>
                            {/* <div className="protect-fee text-muted small">
                              + ${50} Protect Promise Fee
                            </div> */}
                          </div>

                          <div className="quantity-control mt-3">
                            <div className="d-inline-flex align-items-center ">
                              <button
                                className="btn btn-sm qty-btn border rounded"
                                onClick={() => handleQuantity(item._id, "dec")}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                className="btn btn-sm qty-btn border rounded"
                                onClick={() => handleQuantity(item._id, "inc")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Details - Right Sidebar */}
            <div className="col-lg-4">
              <div className="price-details-card">
                <h6 className="price-details-title">PRICE DETAILS</h6>

                <div className="price-row">
                  <span>Price ({cartItems.length} items)</span>
                  <span>${totals.price}</span>
                </div>

                <div className="price-row">
                  <span>Discount</span>
                  <span className="text-success">-${totals.discount}</span>
                </div>

                <div className="price-row">
                  <span>Protect Promise Fee</span>
                  <span>${totals.protectPromiseFee}</span>
                </div>

                <hr className="divider" />

                <div className="price-row total-amount">
                  <span>
                    <strong>Total Amount</strong>
                  </span>
                  <span>
                    <strong>${totals.totalAmount}</strong>
                  </span>
                </div>

                <div className="savings-text text-success">
                  You will save ${totals.savings} on this order
                </div>

                <div className="secure-payments">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="secureCheck"
                      checked
                      readOnly
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="secureCheck"
                    >
                      Safe and Secure Payments. Easy returns. 100% Authentic
                      products.
                    </label>
                  </div>
                </div>

                <NavLink
                  to="/checkout"
                  className="btn btn-warning place-order-btn w-100"
                >
                  PLACE ORDER
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
