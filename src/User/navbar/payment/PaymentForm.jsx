"use client"

import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import api from "../../../../utis/axios"
import { fetchOrders } from "../../../app/Slice/orderSlice/orderSlice"
import { CreditCard, Home, MapPin, Phone, User } from "lucide-react"

const PaymentForm = () => {
  const location = useLocation()
  const { state } = location
  const { amounts, orderDetails } = state || { amounts: 0, orderDetails: [] }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const id = localStorage.getItem("id")
  const user = useSelector((state) => state.auth.userId)

  const [formData, setFormData] = useState({
    firstName: "",
    location: "",
    phone: "",
    pincode: "",
    amount: amounts,
  })

  const Subtotal = cart?.reduce((total, product) => {
    if (product?.productId && product.productId.price) {
      return total + product.productId.price * product.quantity
    }
    return total
  }, 0)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckout = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post(`/user/payments/${id}`, {
        currency: "INR",
        amount: Subtotal * 100,
      })

      if (response.data.success) {
        const options = {
          key: "rzp_test_wL1B6IUAUSnQqu", // Replace with live key in production
          amount: Subtotal * 100,
          currency: "INR",
          name: "BabyKu-ecommerce",
          description: "Test Transaction",
          image: "https://your-domain.com/path-to-your-image/logo.png", // Use absolute path for image
          order_id: response.data.data.id,
          handler: async (response) => {
            const verificationResponse = await api.post(`/user/paymentverification/${id}`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            })
            if (verificationResponse?.data?.success) {
              toast.success(`You Paid ₹${Subtotal} Successfully`)
              navigate("/shop")
            } else {
              toast.error("Payment verification failed")
            }
          },
          prefill: {
            name: user?.username,
            email: user?.email,
            contact: user?.contact,
          },
          notes: {
            address: user?.address,
            pincode: user?.pincode,
          },
          theme: {
            color: "#3399cc",
          },
        }

        const rzp1 = new window.Razorpay(options)
        rzp1.on("payment.failed", (response) => {
          alert(`Payment failed: ${response.error.description}`)
        })
        rzp1.open()
      } else {
        toast.error("Failed to create payment order")
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Cart is empty")
      } else {
        console.error("Payment Creation Failed:", error)
        toast.error("Payment Creation Failed. Please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-6">
          <h2 className="text-2xl font-bold text-center text-white">Delivery Address</h2>
          <p className="text-blue-100 text-center text-sm mt-1">Please provide your delivery details</p>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600 text-sm">Order Total:</span>
            <span className="text-xl font-bold text-blue-600">₹{Subtotal || 0}</span>
          </div>

          <form onSubmit={handleCheckout}>
            <div className="space-y-5">
              <div className="relative">
                <label className="text-gray-700 text-sm font-medium block mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-gray-700 text-sm font-medium block mb-2">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-gray-700 text-sm font-medium block mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-gray-700 text-sm font-medium block mb-2">Pincode</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your pincode"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300 font-medium"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Proceed to Payment
              </button>

              <Link
                to="/home"
                className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg transition duration-300 font-medium"
              >
                Return to Home
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Your payment is secured with Razorpay's encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentForm

