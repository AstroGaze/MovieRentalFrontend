import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarCustom from "./navbar";

const RentarPelicula = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [returnDate, setReturnDate] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://movierentalsebas.azurewebsites.net/api/movies/getMovie/${id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching movie data");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("Error al cargar los datos de la pelicula");
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://movierentalsebas.azurewebsites.net/api/rentals/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ movie: movie._id, returnDate }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      navigate("/catalogo"); // Redirect to rentals page on success
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <NavbarCustom />
      <div className="container mx-auto mt-8 p-4">
        {movie ? (
          <div className="max-w-md mx-auto bg-slate-600 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Rentar Película: {movie.title}
            </h2>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-72 rounded-md mb-4"
            />
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div>
                <label
                  htmlFor="returnDate"
                  className="block text-gray-200 text-sm font-medium mb-2"
                >
                  Fecha de Devolución:
                </label>
                <input
                  type="date"
                  id="returnDate"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
              >
                Confirmar Renta
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center text-gray-200">Cargando...</div>
        )}
      </div>
    </>
  );
};

export default RentarPelicula;
