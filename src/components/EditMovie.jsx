import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarCustom from "./navbar";

const EditMovie = () => {
  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies/getMovie/${id}`
        ); // Fetch user by ID
        const data = await response.json();
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (response.ok) {
        navigate("/peliculas"); // Redirect to user list or another page
      } else {
        setError("Failed to update movie. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <NavbarCustom />
      <h1 className="text-center mb-4 text-3xl">Agregar pelicula</h1>
      <form
        class="max-w-sm mx-auto bg-slate-600 p-6 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div class="mb-5">
          <label
            for="titulo"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Titulo
          </label>
          <input
            type="text"
            id="titulo"
            name="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={movie.title ? movie.title : ""}
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="descripcion"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripcion
          </label>
          <input
            name="description"
            type="text"
            id="descripcion"
            defaultValue={movie.description ? movie.description : ""}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="año"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Año
          </label>
          <input
            name="year"
            type="text"
            id="año"
            defaultValue={movie.year ? movie.year : ""}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="poster"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Poster
          </label>
          <input
            name="poster"
            type="text"
            id="poster"
            defaultValue={id}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EditMovie;
