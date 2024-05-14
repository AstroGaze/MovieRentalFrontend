import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import NavbarCustom from "./navbar";
function EditRenta() {
  const { id } = useParams(); // Get rental ID from URL parameters
  const navigate = useNavigate();
  const [rental, setRental] = useState(null);
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: es });
  };

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/rentals/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Rental not found");
        }
        const data = await response.json();
        setRental(data);
        setReturnDate(data.returnDate);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching rental:", error);
        setError(error.message);
      }
    };
    fetchRental();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/rentals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ returnDate, status }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      navigate("/rentas"); // Or redirect to another page after update
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <NavbarCustom />
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-semibold text-black mb-4 text-center">
          Actualizar estado de renta
        </h2>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {rental ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-slate-600 shadow-md rounded-lg p-6"
          >
            <div className="mb-4">
              <label
                htmlFor="returnDate"
                className="block text-sm font-medium text-gray-200"
              >
                Return Date:
              </label>
              <input
                type="date"
                className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
                id="returnDate"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
              <p className="text-gray-400 text-sm mt-1">
                Retorno Actual: {formatDate(rental.returnDate)}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-200"
              >
                Estado:
              </label>
              <select
                className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="rented">Rentado</option>
                <option value="returned">Retornado</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
            >
              Editar Renta
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-200">Loading...</div>
        )}
      </div>
    </>
  );
}

export default EditRenta;
