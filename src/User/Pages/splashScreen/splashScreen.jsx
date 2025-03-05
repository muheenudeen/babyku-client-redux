import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import babyimg from '../../../assets/baby-1.gif'

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-center">
        <img 
          // src="src/assets/baby-1.gif" 
          src={babyimg} 
          alt="Loading" 
          className="w-32 h-32 mx-auto mb-4" 
        />
        <p className="text-lg font-semibold text-gray-700">
          Loading
          <span className="animate-ping">.</span>
          <span className="animate-ping delay-150">.</span>
          <span className="animate-ping delay-300">.</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;