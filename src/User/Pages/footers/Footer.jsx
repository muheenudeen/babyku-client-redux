import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-stone-300 text-black p-8">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between">
        <div className="mb-6 md:mb-0">
          <div className="mb-4">
            <img
              width="106"
              height="34"
              src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
              alt="Logo"
            />
          </div>
          <p>123 Fifth Ave, New York, NY 12004.</p>
          <p>+1 123 456 78 90</p>
          <p>mail@example.com</p>
          <div className="mt-4 flex gap-4 text-xl">
            <FaFacebookF className="hover:text-blue-700 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
            <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
            <FaXTwitter className="hover:text-gray-700 cursor-pointer" />
          </div>
        </div>

        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold italic text-lg text-blue-900 mb-2">Customer Service</h4>
          <ul>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Help & FAQs</a></li>
            <li><a href="#" className="hover:underline">Payment Method</a></li>
            <li><a href="#" className="hover:underline">Delivery Information</a></li>
            <li><a href="#" className="hover:underline">Track Your Order</a></li>
            <li><a href="#" className="hover:underline">Return & Exchanges</a></li>
          </ul>
        </div>

        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold italic text-lg text-blue-900 mb-2">Categories</h4>
          <ul>
            <li><a href="#" className="hover:underline">Clothing & Fashion</a></li>
            <li><a href="#" className="hover:underline">Toys</a></li>
            <li><a href="#" className="hover:underline">School Supplies</a></li>
            <li><a href="#" className="hover:underline">Birthday Party Supplies</a></li>
            <li><a href="#" className="hover:underline">Baby Diapering</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold italic text-lg text-blue-900 mb-2">Our Company</h4>
          <ul>
            <li><a href="#" className="hover:underline">Corporate Information</a></li>
            <li><a href="#" className="hover:underline">Privacy & Cookies Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Promo & Terms</a></li>
          </ul>
        </div>
      </div>

      <hr className="mt-10" />
      <div className="p-5 text-center">
        Copyright © 2024 Baby Store | Powered by Baby Store
      </div>
    </footer>
  );
};

export default Footer;
