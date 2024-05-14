import React, { useState, useEffect } from "react";
import NavbarCustom from "./components/navbar";
import { Link } from "react-router-dom";

const TablaPeliculas = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies/"); // Fetch from your API endpoint
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("¿Estas seguro que quieres eliminar esta pelicula?")) {
      // Confirmation dialog
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Update the user list after successful deletion
          setMovies(movies.filter((movie) => movie._id !== userId));
          navigate("/peliculas"); // Redirect after deletion
        } else {
          console.error("Error deleting user:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <NavbarCustom />
      <h1 className="my-5 text-center font-semibold text-3xl">PELICULAS</h1>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-9/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Titulo
              </th>
              <th scope="col" className="px-6 py-3">
                Descripcion
              </th>
              <th scope="col" className="px-6 py-3">
                Año
              </th>
              <th scope="col" className="px-6 py-3">
                Poster
              </th>
              {/* Add more columns as needed */}
              <th scope="col" className="px-6 py-3 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              movies.map((movie) => (
                <tr
                  key={movie._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {movie.title}
                  </th>
                  <td className="px-6 py-4">{movie.description}</td>
                  <td className="px-6 py-4">{movie.year}</td>
                  <td className="px-6 py-4">{movie.poster}</td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/EditarPelicula/${movie._id}`}>
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-4"
                      >
                        Edit
                      </a>
                    </Link>
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-4">
        <Link to={"/crearPelicula"}>
          <a
            href="/movies/new" // Replace with the correct link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            CREAR
          </a>
        </Link>
      </div>
    </>
  );
};

export default TablaPeliculas;
