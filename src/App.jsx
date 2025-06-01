import "./App.css";
import React from "react";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Mainpage from "./components/Mainpage.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Mainpage />
      <Footer />
    </div>
  );
}
export default App;
