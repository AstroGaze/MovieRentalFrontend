import React, { useEffect, useState } from "react";
import NavbarCustom from "./components/navbar";
import ListaPeliculas from "./components/listaPeliculas";

function Catalogo() {
  const [peliculas, setPeliculas] = useState([]);
  const token = localStorage.getItem("authToken");
  console.log(token);
  const getPeliculas = () => {
    fetch("http://localhost:5000/api/movies", {
      headers: {
        Authorization: "Bearer " + token, // Include the token here
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPeliculas(data);
      });
  };

  useEffect(() => {
    getPeliculas();
  }, []);

  return (
    <>
      <NavbarCustom />
      <div className="h-screen bg-slate-600 container w-full">
        <div className="w-9/12 mx-auto">
          <h1 className="text-left py-4 text-white text-5xl font-semibold">
            Catalogo
          </h1>
          <div className="flex flex-wrap gap-5">
            <ListaPeliculas peliculas={peliculas} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Catalogo;
