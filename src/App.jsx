import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LinkPage from "./LinkPage";
import WhatsAppButton from "./User/component/whatsApp/whatsApp";
import Navbar from "./User/navbar/NavbarLink";

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
