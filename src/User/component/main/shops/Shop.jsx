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
import { Heart, ShoppingBag } from "lucide-react"

function Shop() {
  const [products, setProducts] = useState([])
  const [searchItem, setSearchItem] = useState("")
  const [category, setCategory] = useState("")
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false)

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const cart = useSelector((state) => state.cart.cart)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  useEffect(() => {
    api
      .get("/user/products")
      .then((response) => {
        if (response.data.success) setProducts(response.data.data)
      })
      .catch((error) => {
        console.error("Error fetching products", error)
        toast.error("Error fetching products", error)
      })

    if (isLoggedIn) {
      dispatch(settingWishList())
    }
  }, [dispatch, isLoggedIn])

  const handleSearchChange = (searchValue) => {
    setSearchItem(searchValue)
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title?.toLowerCase().includes(searchItem.toLowerCase())
    const matchesCategory = category ? product.category === category : true
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navbar onSearch={handleSearchChange} onShowWishlist={handleShowWishlist} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-stone-50">
        {filteredProducts.map((product) => {
          const isInWishlist = wishlistItems?.some((item) => item?.productId?._id === product._id)

          return (
            <div
              key={product._id}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.imageSrc || "/placeholder.svg"}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={product.description}
                />

                {/* Wishlist button - always visible at top right */}
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-white"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                </button>

                {/* Add to cart overlay - visible on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mb-6 px-4 py-2.5 bg-white text-gray-900 font-medium rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-100"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-lg font-semibold text-gray-900">${product.price}</p>
              </div>
            </div>
          )
        })}
      </div>

      {wishlistModalOpen && (
        <WishalistModal onClose={handleCloseWishlistModal}>
          <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
          {wishlistItems?.length > 0 ? (
            <ul className="space-y-4">
              {wishlistItems.map((item) => (
                <li
                  key={item?.productId?._id}
                  className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item?.productId?.imageSrc || "/placeholder.svg"}
                      className="w-24 h-24 object-cover rounded-lg"
                      alt={item?.productId?.description}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item?.productId?.title}</h3>
                      <p className="text-gray-600">{item?.productId?.category}</p>
                      <p className="text-blue-500 font-semibold">${item?.productId?.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWishlist(item?.productId?._id)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-8 text-gray-500">Your wishlist is empty.</p>
          )}
        </WishalistModal>
      )}
      <Footer />
    </>
  )
}

export default Shop

