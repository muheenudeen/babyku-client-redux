import { Link } from "react-router-dom";
import { X, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

const HomeModal = ({ isOpen, onClose, selectedProduct }) => {
  const [zoom, setZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) {
    return null;
  }

  const rating = selectedProduct.rating || 4;
  const discountPercentage = selectedProduct.discountPercentage || 25;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl transform transition-all flex">
        {/* Product Image with Discount Badge and Zoom Effect */}
        <div
          className="relative w-1/2"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={selectedProduct.imageSrc || "/placeholder.svg"}
            className="w-full h-full object-cover"
            alt={selectedProduct.title}
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
            {discountPercentage}% OFF
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
          >
            <X className="h-5 w-5 text-gray-800" />
          </button>

          {/* Zoom Lens Effect */}
          {zoom && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${selectedProduct.imageSrc || "/placeholder.svg"})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: "200%",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </div>

        {/* Product Details */}
        <div className="w-1/2 p-6">
          {/* Product Title and Rating */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.title}</h2>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-baseline mt-2 mb-4">
            <p className="text-2xl font-bold text-gray-800">${selectedProduct.price}</p>
            {discountPercentage > 0 && (
              <p className="ml-2 text-sm text-gray-500 line-through">
                ${(selectedProduct.price * (100 / (100 - discountPercentage))).toFixed(2)}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

          {/* Available Offers Section */}
          <div className="bg-orange-50 p-4 rounded-xl mb-6">
            <h3 className="font-bold text-orange-800 mb-2">AVAILABLE OFFERS</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>
                  Upto 50% Off + Additional 10% on Freedom sale use code:{" "}
                  <span className="font-semibold">Republic10</span>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>
                  Enjoy 10% off on your first purchase! Use coupon code <span className="font-semibold">WELCOME10</span>{" "}
                  at checkout
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium transition-colors"
            >
              <X className="h-5 w-5 mr-2" />
              Close
            </button>

            <Link
              to="/shop"
              className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModal;