import React, { useState } from "react";
import AnimatedUnderline from "../../util/animate";
import useNotification from "../../util/notify";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export interface user {
  name: string,
  password: string
}

interface loginPprops {
  setUser: (value: user) => void
}

const Login: React.FC<loginPprops> = ({ setUser }) => {

  const [viewPassword, setViewPassword] = useState(false);
  const { notify, contextHolder } = useNotification();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get('username') as string | null;
    const password = formData.get('password') as string | null;

    if (!username && !password) {
      notify("Ingresa el usuario o la contraseña para continuar", "warning");
      return;
    }

    setUser({ name: username ?? '', password: password ?? '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col md:flex-row bg-amber-50">
      {contextHolder}
      <div className="md:bg-amber-50 bg-gray-900 md:text-gray-950 text-white w-full md:w-5/12 h-full flex items-center justify-center font-extrabold text-3xl p-4">
        <p>
          <AnimatedUnderline text={"Gestiona tus proyectos de forma eficiente y visual.  Organiza tareas, subtareas, dependencias y plazos con total claridad. ¡Lleva tu productividad al siguiente nivel!"} />

        </p>
      </div>
      <div className="w-full md:w-7/12 flex items-center justify-center flex-col gap-3.5 text-1xl text-white bg-gray-900 h-full ">
        <p>conserva tu contraseña y usuario puedes acceder a tu informacion</p>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-2xl shadow-lg w-80"
        >
          <h2 className="text-white text-2xl mb-6 text-center font-semibold">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-400 mb-2">usuario</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 mb-2">contraseña</label>
            <input
              type={viewPassword ? "password" : "text"}
              name="password"
              id="password"
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="relative left-56 bottom-8 text-gray-400 cursor-pointer  w-4"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Ingresar esto es una prueva para dev
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
