import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/Slice/authSlice/authSlice";

const Navbar = ({ onSearch, onShowWishlist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart?.cart || []);
  const wishlist = useSelector((state) => state.wishlist?.items || []);

  const totalCartQuantity = cart.length;
  const totalWishlistQuantity = wishlist.length;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
    onSearch(event.target.value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    closeModal();
  };

  return (
    <>
      <nav className="bg-[#fde047] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              width="106"
              height="34"
              src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
              alt="Logo"
            />
          </div>
          <div className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchItem}
              className="hidden md:block p-2 rounded bg-white text-grey"
              onChange={handleSearchChange}
              onFocus={() => navigate("/shop")}
            />

            {/* Wishlist Icon */}
            <button onClick={onShowWishlist} className="text-white relative">
              <svg
                fill="grey"
                xmlns="http://www.w3.org/2000/svg"
                height="34px"
                viewBox="0 0 24 24"
                width="34px"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {totalWishlistQuantity > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalWishlistQuantity}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="text-white relative">
              <svg
                fill="grey"
                xmlns="http://www.w3.org/2000/svg"
                height="34px"
                viewBox="0 -960 960 960"
                width="34px"
              >
                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
              </svg>
              {totalCartQuantity > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalCartQuantity}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <img
                src={user?.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQNJtFsdtSeo-E-UPrgxU8qkQGISaSjCjXg&s"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={openModal}
              />
            ) : (
              <Link to="/">
                <button className="bg-cyan-500 text-white rounded-full py-2 px-4 hover:bg-cyan-600">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <Link to="/">
              <h2 className="text-xl mb-4">Confirm Logout</h2>
            </Link>
            <div className="flex items-center space-x-4">
              <img
                src={user?.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQNJtFsdtSeo-E-UPrgxU8qkQGISaSjCjXg&s"}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <span>{user?.name || "Thank you"}</span>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white rounded-full py-2 px-4 hover:bg-gray-600"
              >
                Cancel
              </button>
              <Link to="/">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white rounded-full py-2 px-4 hover:bg-red-600"
                >
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;