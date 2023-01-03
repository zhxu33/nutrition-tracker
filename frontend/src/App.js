import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import List from "./pages/List";
import Data from "./pages/Data";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/list/:id" element={<List />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
