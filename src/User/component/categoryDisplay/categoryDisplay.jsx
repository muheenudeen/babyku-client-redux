import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utis/axios";

const dummyImages = {
  Dress: "https://www.menmoms.in/cdn/shop/files/Shop-By-Category-KIDS-APPAREL-01.png?v=1727785740&width=600",
  Food: "https://www.menmoms.in/cdn/shop/files/Shop-By-Category-KIDS-APPAREL-01.png?v=1727785740&width=600",
  toys: "https://www.menmoms.in/cdn/shop/files/Shop-By-Category-TOYS-01.png?v=1727785740&width=600",
  Nutrition: "https://www.menmoms.in/cdn/shop/files/Shop-By-Category-INFANT-UTILITY-01.png?v=1727785740&width=600",
  Toys: "https://www.menmoms.in/cdn/shop/files/Shop-By-Category-FEEDING-01.png?v=1727785740&width=400",
};

function CategoryDisplay() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/products").then((response) => {
      if (response.data.success) {
        const uniqueCategories = [...new Set(response.data.data.map((p) => p.category))];
        setCategories(uniqueCategories);
      }
    });
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="p-6 flex flex-col items-center bg-yellow-50">
<h2 className="text-3xl md:text-3xl font-bold text-center mb-6">SHOP BY CATEGORY</h2>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => handleCategoryClick(category)}>
            <div className="w-60 h-60 flex items-center justify-center">
              <img src={dummyImages[category] || dummyImages["Fashion"]} alt={category} className="w-full h-full object-cover" />
            </div>
            <p className="mt-3 text-xl font-semibold">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryDisplay;
