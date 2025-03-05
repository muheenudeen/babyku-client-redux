"use client"

import { useEffect, useState } from "react"
import Navbar from "../../../navbar/NavbarLink"
import Footer from "../../../Pages/footers/Footer"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../../../app/Slice/cartSlice/cartSlice"
import {
  settingWishList,
  addToWishListAsync,
  removeFromWishListAsync,
} from "../../../../app/Slice/wishSlice/wishalistSlice"
import WishalistModal from "../../../../admin/compoent/componants/modal/wishalistModal"
import api from "../../../../../utis/axios"
import toast from "react-hot-toast"
import { Heart, ShoppingBag, ChevronDown } from "lucide-react"

function Shop() {
  const [products, setProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [searchItem, setSearchItem] = useState("")
  const [category, setCategory] = useState("")
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const productsPerPage = 8

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const cart = useSelector((state) => state.cart.cart)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  useEffect(() => {
    setLoading(true)
    api
      .get("/user/products")
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.data)
          // Initially display only first batch of products
          setDisplayedProducts(response.data.data.slice(0, productsPerPage))
        }
      })
      .catch((error) => {
        console.error("Error fetching products", error)
        toast.error("Error fetching products")
      })
      .finally(() => {
        setLoading(false)
      })

    if (isLoggedIn) {
      dispatch(settingWishList())
    }
  }, [dispatch, isLoggedIn])

  useEffect(() => {
    // Filter products when search or category changes
    const filtered = products.filter((product) => {
      const matchesSearch = product.title?.toLowerCase().includes(searchItem.toLowerCase())
      const matchesCategory = category ? product.category === category : true
      return matchesSearch && matchesCategory
    })

    setDisplayedProducts(filtered.slice(0, page * productsPerPage))
  }, [searchItem, category, products, page])

  const handleSearchChange = (searchValue) => {
    setSearchItem(searchValue)
    setPage(1) // Reset to first page when search changes
  }

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart(product))
      toast.success("Added to cart")
    } else {
      toast.error("Please login.")
    }
  }

  const handleAddToWishlist = (product) => {
    if (isLoggedIn) {
      dispatch(addToWishListAsync(product))
    } else {
      toast.error("Please login to add to wishlist.")
    }
  }

  const handleShowWishlist = () => {
    setWishlistModalOpen(true)
  }

  const handleCloseWishlistModal = () => {
    setWishlistModalOpen(false)
  }

  const handleRemoveFromWishlist = (product) => {
    if (isLoggedIn) {
      dispatch(removeFromWishListAsync(product))
    } else {
      toast.error("Please login and remove product from wishlist")
    }
  }

  const loadMoreProducts = () => {
    setLoadingMore(true)
    // Simulate loading delay
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1)
      setLoadingMore(false)
    }, 800)
  }

  // Calculate if there are more products to load
  const hasMoreProducts = products.length > displayedProducts.length

  // Calculate discounted price (20% off)
  const calculateDiscountedPrice = (originalPrice) => {
    const discount = originalPrice * 0.2
    return (originalPrice - discount).toFixed(2)
  }

  return (
    <>
      <Navbar onSearch={handleSearchChange} onShowWishlist={handleShowWishlist} />

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">Shop Collection</h1>

          {loading ? (
            // Skeleton loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="w-full h-64 bg-blue-100 animate-pulse"></div>
                  
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => {
                  const isInWishlist = wishlistItems?.some((item) => item?.productId?._id === product._id)
                  const discountedPrice = calculateDiscountedPrice(product.price)

                  return (
                    <div
                      key={product._id}
                      className="group bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative">
                        {/* Discount badge - always visible */}
                        <div className=" top-0 left-0 bg-orange-500 mr-44 text-white px-3 py-1 rounded-br-lg font-medium z-10">
                          20% OFF
                        </div>

                        <div className=" overflow-hidden">
                          <img
                            src={product.imageSrc || "/placeholder.svg"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt={product.description || product.title}
                          />

                          {/* Overlay with buttons - only visible on hover */}
                          <div className="absolute inset-0 bg-white-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                            {/* Add to cart button */}
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="px-4 py-2 bg-yellow-300 text-blue-600 font-medium rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-yellow-400"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </button>

                            {/* Wishlist button */}
                            <button
                              onClick={() => handleAddToWishlist(product)}
                              className="p-2 bg-white text-blue-600 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-50 delay-75"
                            >
                              <Heart className={`w-5 h-5 ${isInWishlist ? "fill-blue-600" : ""}`} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product info - always visible */}
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-blue-600">${discountedPrice}</span>
                          <span className="text-sm text-gray-500 line-through">${product.price}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Load more button */}
              {hasMoreProducts && (
                <div className="mt-10 text-center">
                  <button
                    onClick={loadMoreProducts}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md inline-flex items-center gap-2 transition-colors duration-200 disabled:opacity-70"
                  >
                    {loadingMore ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {displayedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {wishlistModalOpen && (
        <WishalistModal onClose={handleCloseWishlistModal}>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Wishlist</h2>
          {wishlistItems?.length > 0 ? (
            <ul className="space-y-4">
              {wishlistItems.map((item) => {
                const originalPrice = item?.productId?.price || 0
                const discountedPrice = calculateDiscountedPrice(originalPrice)

                return (
                  <li
                    key={item?.productId?._id}
                    className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <span className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-br-md">
                          20% OFF
                        </span>
                        <img
                          src={item?.productId?.imageSrc || "/placeholder.svg"}
                          className="w-20 h-20 object-cover rounded-md"
                          alt={item?.productId?.description || item?.productId?.title}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">{item?.productId?.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-base font-bold text-blue-600">${discountedPrice}</span>
                          <span className="text-xs text-gray-500 line-through">${originalPrice}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleAddToCart(item?.productId)}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(item?.productId?._id)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <Heart className="w-4 h-4 fill-blue-600" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="text-center py-12 px-4">
              <Heart className="w-12 h-12 mx-auto text-blue-200 mb-4" />
              <p className="text-gray-500">Your wishlist is empty.</p>
              <button
                onClick={handleCloseWishlistModal}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </WishalistModal>
      )}
      <Footer />
    </>
  )
}

export default Shop

