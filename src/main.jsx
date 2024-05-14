import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./Register.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu.jsx";
import Catalogo from "./Catalogo.jsx";
import TablaUsuarios from "./TablaUsuarios.jsx";
import Edit from "./components/EditUser.jsx";
import TablaPeliculas from "./TablaPeliculas.jsx";
import CrearMovies from "./CrearMovie.jsx";
import EditMovie from "./components/EditMovie.jsx";
import RentarPelicula from "./components/rentarPelicula.jsx";
import RentalsTable from "./TablaRenta.jsx";
import EditRenta from "./components/EditRenta.jsx";
import TablaMisRentas from "./TablaMisRentas.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Menu" element={<Menu />}></Route>
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/usuarios" element={<TablaUsuarios />} />
        <Route path="/peliculas" element={<TablaPeliculas />} />
        <Route path="/getUsuario/:id" element={<Edit />} />
        <Route path="/EditarPelicula/:id" element={<EditMovie />} />
        <Route path="/crearPelicula" element={<CrearMovies />} />
        <Route path="/rentarPelicula/:id" element={<RentarPelicula />} />
        <Route path="/rentas" element={<RentalsTable />} />
        <Route path="/Editrenta/:id" element={<EditRenta />} />
        <Route path="/misRentas" element={<TablaMisRentas />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
