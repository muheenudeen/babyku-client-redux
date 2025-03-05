import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LinkPage from "./LinkPage";
import WhatsAppButton from "./User/component/whatsApp/whatsApp";

const App = () => {
  

  return (
    <>
     
        <Router>
          <LinkPage />
          <WhatsAppButton />
        </Router>
     
    </>
  );
};

export default App;
