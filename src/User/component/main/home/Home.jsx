import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Navbar from '../../../navbar/NavbarLink';
import Footer from '../../../Pages/footers/Footer';
import api from '../../../../../utis/axios';
import HomeModal from '../../../../admin/compoent/componants/modal/homeModal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryDisplay from '../../categoryDisplay/categoryDisplay';
import ImageGallery from '../../imgStyle/imgStyle';

function Home() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/user/products')
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the product data!', error);
      });
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const navigateToShop = () => {
    navigate('/shop');
  };

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
  
    <div>
      <div className="w-full mt-3">
       <Navbar/>

        <Slider {...bannerSettings} className="w-full">
          
          {[
            "https://www.menmoms.in/cdn/shop/files/Baby-Fashion-Clothes-Category-Page-Banner-Desktop.jpg?v=1727780797",
            "https://www.menmoms.in/cdn/shop/files/Sale-Category-Page-Banner-Desktop.jpg?v=1727779570",
            "https://www.menmoms.in/cdn/shop/files/The_biggest_Festive_Sale_-1st-banner_12_nov.jpg?v=1731399204&width=1500",
            "https://www.menmoms.in/cdn/shop/files/Diapers_Category_image.jpg?v=1734674025",
          ].map((image, index) => (
            <div key={index} className="w-full h-[350px]">
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
      <CategoryDisplay />
      <div className="p-4 bg-stone-100">
      <h1 className="text-center text-2xl font-bold mb-14 mt-14 ">PARENT-APPROVED BESTSELLERS</h1>
        <Slider {...productSliderSettings}>
          {products.map((product) => (
            <div key={product._id} className="p-2">
              <div
                className="relative bg-white rounded-lg shadow-lg transition-transform duration-300 overflow-hidden"
                onClick={() => openModal(product)}
              >
                {/* Product Image with Hover Zoom */}
                <div className="overflow-hidden">
                  <img
                    src={product.imageSrc}
                    alt={product.description}
                    className="w-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
                {/* Product Details */}
                <div className="p-3">
                  <p className="text-lg font-semibold">{product.title}</p>
                  <p className="text-gray-700">${product.price}</p>
                </div>

                {/* Offer Percentage */}
                {product.offer && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                    {product.offer}% OFF
                  </span>
                )}

                {/* Shop Button */}
                <button
                  className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToShop();
                  }}
                >
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          ))}
        </Slider>

      </div>
      <HomeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedProduct={selectedProduct}
      />
      <ImageGallery/>

      <Footer />
      </div>
    
  );
}

export default Home;
