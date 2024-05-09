import * as React from "react";
import { Link } from "react-router-dom";

function Form() {
  return (
    <form
      action="post"
      className="bg-white px-10 py-20 rounded-3xl border-gray-200 w-9/12"
    >
      <h1 className="text-5xl font-semibold">Bienvenido</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Bienvenido de regreso, por favor introduce tus credenciales.
      </p>
      <div className="mt-8">
        <div className="mb-5">
          <label htmlFor="" className="text-lg font-medium">
            Correo Electronico
          </label>
          <input
            type="email"
            name="correo"
            id="correo"
            placeholder="Ingresa tu correo electronico"
            className="block border-2 p-4 bg-slate-100 rounded-xl mt-1 w-full"
          />
        </div>
        <div>
          <label htmlFor="" className="text-lg font-medium">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            className="block border-2 p-4 bg-slate-100 rounded-xl mt-1 w-full"
          />
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-[0.98] py-3 rounded-xl bg-green-600 text-white text-lg font-bold">
            Ingresar
          </button>
          <Link
            to={"/Register"}
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
