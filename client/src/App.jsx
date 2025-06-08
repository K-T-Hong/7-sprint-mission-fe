import "./App.css";
import React from "react";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import MarketMainPage from "./components/MarketMainPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import { Route, Routes } from "react-router-dom";
import MarketItemsPage from "./components/MarketItemsPage.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sightseeing" element={<MarketMainPage />} />
        <Route path="/items" element={<MarketItemsPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
