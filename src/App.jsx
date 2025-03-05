import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LinkPage from "./LinkPage";
import WhatsAppButton from "./User/component/whatsApp/whatsApp";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        <Router>
          <LinkPage />
          <WhatsAppButton />
        </Router>
      )}
    </>
  );
};

export default App;
