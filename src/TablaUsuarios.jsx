import React, { useState, useEffect } from "react";
import NavbarCustom from "./components/navbar";
import { Link } from "react-router-dom";

const TablaUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://movierentalsebas.azurewebsites.net/api/users/getUsuarios"
        ); // Fetch from your API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("¿Estas seguro que quieres eliminar este usuario?")) {
      // Confirmation dialog
      try {
        const response = await fetch(
          `https://movierentalsebas.azurewebsites.net/api/users/deleteUser/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Update the user list after successful deletion
          setUsers(users.filter((user) => user._id !== userId));
          navigate("/users"); // Redirect after deletion
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
      <h1 className="my-5 text-center font-semibold text-3xl">USUARIOS</h1>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Admin
              </th>
              {/* Add more columns as needed */}
              <th scope="col" className="px-6 py-3 text-center">
                Actions
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
              users.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.esAdmin ? "Yes" : "No"}</td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/getUsuario/${user._id}`}>
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
                      onClick={() => handleDelete(user._id)}
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
    </>
  );
};

export default TablaUsuarios;
