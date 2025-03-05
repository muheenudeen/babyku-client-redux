import { useNavigate } from "react-router-dom";
import Navbar from "../../../navbar/NavbarLink";
import Footer from "../../../Pages/footers/Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  settingCart,
} from "../../../../app/Slice/cartSlice/cartSlice";
import { useEffect } from "react";

const Carts = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (id) dispatch(settingCart());
  }, [dispatch, id]);

  const totalAmount = cart.reduce(
    (total, product) => total + product.productId.price * product.quantity,
    0
  );

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    navigate("/paymentform", {
      state: { amount: totalAmount, orderDetails: cart },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="shadow-lg rounded-lg overflow-hidden bg-white p-6">
          <div className="flex justify-between border-b pb-4">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
          </div>

          <div className="mt-6 mb-4 grid grid-cols-5 text-gray-600 text-xs font-semibold uppercase">
            <h3 className="col-span-2">Product Details</h3>
            <h3 className="text-center">Quantity</h3>
            <h3 className="text-center">Price</h3>
            <h3 className="text-center">Total</h3>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500 my-10 text-lg">
              Your cart is empty.
            </p>
          ) : (
            cart.map((product) => (
              <div
                key={product.productId._id}
                className="flex items-center border-b py-4"
              >
                <div className="flex items-center w-2/5 space-x-4">
                  <img
                    className="w-24 h-24 object-cover rounded-lg"
                    src={product.productId.imageSrc}
                    alt={product.productId.title}
                  />
                  <div>
                    <h3 className="font-bold text-sm">{product.productId.title}</h3>
                    <p className="text-xs text-gray-500">
                      {product.productId.description}
                    </p>
                    <button
                      onClick={() => handleRemove(product.productId._id)}
                      className="text-red-500 text-xs hover:underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex justify-center items-center w-1/5 space-x-2">
                  <button
                    onClick={() => handleDecrement(product)}
                    className="bg-gray-300 px-2 py-1 rounded text-gray-700 hover:bg-gray-400"
                  >
                    -
                  </button>
                  <input
                    className="w-10 text-center border rounded"
                    type="text"
                    value={product.quantity}
                    readOnly
                  />
                  <button
                    onClick={() => handleIncrement(product)}
                    className="bg-gray-300 px-2 py-1 rounded text-gray-700 hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                <span className="text-center w-1/5 font-semibold text-sm">
                  ${product.productId.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${product.productId.price * product.quantity}
                </span>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <>
              <div className="flex justify-between items-center mt-8">
                <h1 className="font-semibold text-2xl">Total: ${totalAmount}</h1>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Carts;
