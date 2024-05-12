import React from "react";
import "../navbar.css";
import { Link } from "react-router-dom";
const ListaPeliculas = (props) => {
  return (
    <>
      {props.peliculas.map((pelicula, index) => (
        <div className="image-container">
          <img className="h-72" src={pelicula.poster} alt={pelicula.name} />
          <div className="overlay flex items-center justify-center">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              RENTAR
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListaPeliculas;
