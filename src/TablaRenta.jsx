import React, { useEffect, useState } from "react";
import NavbarCustom from "./components/navbar";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import { Link } from "react-router-dom";

function RentalsTable() {
  const [rentals, setRentals] = useState([]);
  const token = localStorage.getItem("authToken");
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: es });
  };

  useEffect(() => {
    async function fetchRentals() {
      const response = await fetch(
        "https://movierentalsebas.azurewebsites.net/api/rentals/allRentals"
      );
      const data = await response.json();
      setRentals(data);
    }

    fetchRentals();
  }, []);

  const handleDelete = async (rentalId) => {
    if (window.confirm("¿Estas seguro que quieres eliminar esta renta?")) {
      // Confirmation dialog
      try {
        const response = await fetch(
          `https://movierentalsebas.azurewebsites.net/api/rentals/${rentalId}`,
          {
            headers: {
              Authorization: "Bearer " + token, // Include the token here
            },
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Update the user list after successful deletion
          setRentals(rentals.filter((rental) => rental._id !== rentalId));
          navigate("/rentas"); // Redirect after deletion
        } else {
          console.error("Error deleting rental:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting rental:", error);
      }
    }
  };

  return (
    <>
      <NavbarCustom />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-black text-center">
          Rentas
        </h1>{" "}
        {/* Added Title */}
        <div className="overflow-x-auto">
          {" "}
          {/* Add div for horizontal scrolling */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Titulo de la película
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre del Usuario
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha de la renta
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha de retorno
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
                {/* ... other columns ... */}
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr
                  key={rental._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {rental.movie.title}
                  </td>
                  <td className="px-6 py-4">{rental.user.name}</td>
                  <td className="px-6 py-4">{formatDate(rental.rentalDate)}</td>
                  <td className="px-6 py-4">{formatDate(rental.returnDate)}</td>
                  <td className="px-6 py-4">{rental.status}</td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/Editrenta/${rental._id}`}>
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
                      onClick={() => handleDelete(rental._id)}
                      /* onClick={() => handleDelete(movie._id)} */
                    >
                      Delete
                    </a>
                  </td>
                  {/* ... other cells ... */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RentalsTable;
