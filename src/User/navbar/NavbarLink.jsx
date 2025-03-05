"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../app/Slice/authSlice/authSlice"
import SlidingPromotions from "../component/promotions/promotions"

const Navbar = ({ onSearch, onShowWishlist }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchItem, setSearchItem] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoggedIn, user } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart?.cart || [])
  const wishlist = useSelector((state) => state.wishlist?.items || [])

  const totalCartQuantity = cart.length || 0
  const totalWishlistQuantity = wishlist.length || 0

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value)
    onSearch(event.target.value)
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleLogout = () => {
    dispatch(logout())
    closeModal()
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-amber-300 to-yellow-400 shadow-md">
        <SlidingPromotions/>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  width="120"
                  height="40"
                  src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
                  alt="Baby Store Logo"
                  className="h-10"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchItem}
                  className="pl-10 pr-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64 transition-all"
                  onChange={handleSearchChange}
                  onFocus={() => navigate("/shop")}
                />
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={onShowWishlist}
                className="relative p-2 rounded-full hover:bg-amber-200 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-amber-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {totalWishlistQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {totalWishlistQuantity}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-amber-200 transition-colors">
                <svg
                  className="w-6 h-6 text-amber-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                {totalCartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {totalCartQuantity}
                  </span>
                )}
              </Link>

              {/* User Account */}
              {isLoggedIn ? (
                <button onClick={openModal} className="p-2 rounded-full hover:bg-amber-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-amber-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </button>
              ) : (
                <Link to="/">
                  <button className="bg-amber-800 text-white rounded-full py-2 px-6 hover:bg-amber-900 transition-colors shadow-md font-medium">
                    Login
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center space-x-4">
              <button onClick={onShowWishlist} className="relative p-2">
                <svg
                  className="w-6 h-6 text-amber-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {totalWishlistQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {totalWishlistQuantity}
                  </span>
                )}
              </button>

              <Link to="/cart" className="relative p-2">
                <svg
                  className="w-6 h-6 text-amber-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                {totalCartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {totalCartQuantity}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <button onClick={openModal} className="p-2">
                  <svg
                    className="w-6 h-6 text-amber-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </button>
              ) : (
                <Link to="/">
                  <button className="bg-amber-800 text-white rounded-full py-1.5 px-4 text-sm hover:bg-amber-900 transition-colors shadow-md font-medium">
                    Login
                  </button>
                </Link>
              )}

              <button onClick={toggleMenu} className="p-2 rounded-md text-amber-800 hover:bg-amber-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isOpen && (
            <div className="mt-3 pb-3 md:hidden">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchItem}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onChange={handleSearchChange}
                  onFocus={() => navigate("/shop")}
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-amber-800">Account Options</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg mb-4">
              <div className="bg-amber-200 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-amber-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-800">{user?.name || "Welcome"}</div>
                <div className="text-sm text-gray-500">Manage your account</div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Link
                to="/profile"
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-amber-50 text-gray-700 font-medium transition-colors"
                onClick={closeModal}
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-amber-50 text-gray-700 font-medium transition-colors"
                onClick={closeModal}
              >
                My Orders
              </Link>
              <div className="border-t my-2"></div>
              <Link to="/">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2.5 px-4 hover:bg-red-600 transition-colors font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar

