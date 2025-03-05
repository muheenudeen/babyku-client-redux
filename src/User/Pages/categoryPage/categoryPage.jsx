import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../utis/axios";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    api.get("/user/products").then((response) => {
      if (response.data.success) {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data.filter((product) => product.category === category));
      }
    });
  }, [category]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{category} Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="p-4 bg-white rounded-lg shadow-lg">
            <img src={product.imageSrc || "https://via.placeholder.com/150"} alt={product.title} className="w-full h-32 object-cover rounded-lg" />
            <p className="text-center mt-2 font-semibold">{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
