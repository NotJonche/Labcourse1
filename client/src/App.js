import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import SignUp from "./pages/SignupForm.jsx";
import Login from "./pages/LoginForm.jsx";
import Logs from "./pages/Logs";
import HomePage from "./pages/HomePage";
import HousesPage from "./pages/HousesPage";
import BuyHome from "./pages/BuyHome";
import SellHome from "./pages/SellHome";
import RentHome from "./pages/RentHome";
import "bootstrap/dist/css/bootstrap.min.css";
import AuctionLive from "./pages/AuctionLive";

import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth pages */}
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Main layout with nested routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="houses" element={<HousesPage />} />
          <Route path="homes" element={<BuyHome />} />
          <Route path="sell-home" element={<SellHome />} />
          <Route path="rent-home" element={<RentHome />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/auction" element={<AuctionLive auctionId={1} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
