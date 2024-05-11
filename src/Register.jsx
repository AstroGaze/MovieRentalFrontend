import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationMessage("Registration successful");
        setTimeout(navigate("/"), 3000);
        // After successful registration, you might want to redirect to login or do something else
      } else {
        setRegistrationMessage(
          data.error || "An error occurred during registration."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* ... (your background/styling JSX) ... */}

      <div className="w-full flex items-center justify-center lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-10 py-20 rounded-3xl border-gray-200 w-9/12"
        >
          <h1 className="text-5xl font-semibold">Registrarse</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            !Registrate para empezar a rentar peliculas¡
          </p>

          <div className="mt-8">
            {/* Name Input */}
            <div className="mb-7">
              <label htmlFor="name" className="text-lg font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                className="block border-2 p-4 bg-slate-100 rounded-xl mt-1 w-full"
              />
            </div>

            {/* Email Input */}
            <div className="mb-7">
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

            {/* Password Input */}
            <div className="mb-7">
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
                Registrarse
              </button>
              {registrationMessage && <p>{registrationMessage}</p>}
            </div>
          </div>
        </form>
      </div>
      <div className="hidden relative lg:flex h-full items-center justify-center bg-gray-200 w-1/2">
        <div className="w-60 h-60 bg-gradient-to-tr from-green-600 to-blue-700 rounded-full animate-spin"></div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
}

export default Register;
