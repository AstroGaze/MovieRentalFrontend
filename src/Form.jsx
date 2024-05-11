import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginMessage("Login successful");
        // Handle successful login (e.g., store token in local storage or context, then redirect)
        // Example:
        localStorage.setItem("authToken", data.token); // Store token
        /* navigate("/dashboard"); */ // Redirect to dashboard
      } else {
        setLoginMessage(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginMessage("An error occurred during login.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-10 py-20 rounded-3xl border-gray-200 w-9/12"
    >
      <h1 className="text-5xl font-semibold">Bienvenido</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Bienvenido de regreso, por favor introduce tus credenciales.
      </p>
      {loginMessage && <p className="text-red-500">{loginMessage}</p>}{" "}
      {/* Display error message */}
      <div className="mt-8">
        <div className="mb-5">
          {/* ... (email input with value={email} and onChange) ... */}
          <label htmlFor="email" className="text-lg font-medium">
            Correo Electronico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electronico"
            className="block border-2 p-4 bg-slate-100 rounded-xl mt-1 w-full"
          />
        </div>
        <div>
          {/* ... (password input with value={password} and onChange) ... */}
          <label htmlFor="password" className="text-lg font-medium">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="block border-2 p-4 bg-slate-100 rounded-xl mt-1 w-full"
          />
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-[0.98] py-3 rounded-xl bg-green-600 text-white text-lg font-bold">
            Ingresar
          </button>
          <Link
            to="/Register"
            className="active:scale-[0.98] py-3 rounded-xl bg-gray-100 text-black text-lg font-bold border-2 border-gray-200 text-center"
          >
            <button>Registrarse</button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Form;
