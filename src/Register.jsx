import * as React from "react";

function Register() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <form
          action="post"
          className="bg-white px-10 py-20 rounded-3xl border-gray-200 w-9/12"
        >
          <h1 className="text-5xl font-semibold">Registrarse</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            !Registrate para empezar a rentar peliculas¡
          </p>
          <div className="mt-8">
            <div className="mb-7">
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
            <div className="mb-7">
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
            <div>
              <label htmlFor="" className="text-lg font-medium">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Ingresa tu Nombre"
                className="block border-2 p-4 bg-slate-100 rounded-xl mt-1 w-full"
              />
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button className="active:scale-[0.98] py-3 rounded-xl bg-green-600 text-white text-lg font-bold">
                Registrarse
              </button>
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
