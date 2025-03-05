import { useState, useEffect } from "react";

const promotions = [
  "Additional 10% off on first Purchase. Use Code: WELCOME10",
  "Free Shipping Order Above 1.2k.",
  "7 days return policy | T&C Applied*",
];

export default function SlidingPromotions() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-gray-100 text-center py-2 relative h-10">
      <div className="relative w-full h-full flex items-center">
        {promotions.map((promo, i) => (
          <p
            key={i}
            className={`absolute w-full text-center transition-transform duration-1000 ease-in-out ${
              i === index ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            {promo}
          </p>
        ))}
      </div>
    </div>
  );
}
