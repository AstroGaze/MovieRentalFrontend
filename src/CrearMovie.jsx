import React, { useState } from "react";
import NavbarCustom from "./components/navbar";
import { useNavigate } from "react-router-dom";

const CrearMovies = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://movierentalsebas.azurewebsites.net/api/movies/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, year, poster }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRegistrationMessage("Creation successful");
        setTimeout(navigate("/peliculas"), 3000);
        // After successful registration, you might want to redirect to login or do something else
      } else {
        setRegistrationMessage(
          data.error || "An error occurred during movie creation."
        );
      }
    } catch (error) {
      console.error("Creation error:", error);
      setRegistrationMessage("An error occurred during creation.");
    }
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            onChange={(e) => setTitle(e.target.value)}
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
            type="text"
            id="descripcion"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setDescription(e.target.value)}
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
            type="text"
            id="año"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setYear(e.target.value)}
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
            type="text"
            id="poster"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setPoster(e.target.value)}
            required
          />
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

export default CrearMovies;
