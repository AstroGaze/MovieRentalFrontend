import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./Register.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu.jsx";
import Catalogo from "./Catalogo.jsx";
import TablaUsuarios from "./TablaUsuarios.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Menu" element={<Menu />}></Route>
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/usuarios" element={<TablaUsuarios />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
