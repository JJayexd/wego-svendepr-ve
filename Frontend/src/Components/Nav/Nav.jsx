import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Providers/AuthProvider";
import { LoginForm } from "../LoginForm/LoginForm";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginData, setLoginData } = useAuth();

  const navItemsDesktop = [
    { name: "Find et lift", path: "/lift" },
    { name: "Sådan virker det", path: "/" },
  ];

  const navItemsMobile = [
    { name: "Forside", path: "/" },
    { name: "Find et lift", path: "/lift" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setLoginData("");
  };

  return (
    <nav className="ml-auto flex items-center w-full justify-between">
{/* Desktop Nav */}
<ul className="hidden md:flex items-end space-x-6 ml-8">
  {navItemsDesktop.map((item) => (
    <li key={item.path}>
      {item.name === "Sådan virker det" ? (
        <NavLink
          to={item.path}
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className={({ isActive }) =>
            `inline-flex items-center p-4 ${
              isActive ? "border-blue-600" : ""
            } text-gray-800 hover:text-blue-700`
          }
        >
          {item.name}
        </NavLink>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `inline-flex items-center p-4 ${
              isActive ? "border-blue-600" : ""
            } text-gray-800 hover:text-blue-700`
          }
        >
          {item.name}
        </NavLink>
      )}
    </li>
  ))}
</ul>


      {/** Desktop Konto */}
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        {loginData ? (
          <>
            <span className="text-gray-800">
              {loginData?.firstname || loginData?.user?.firstname}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-blue-900 rounded-lg hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-4 py-2 text-blue-900 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </button>
        )}
      </div>

      {/** Mobil Burger-menu */}
      <div className="md:hidden ml-auto">
        <button
          className="flex items-center justify-center h-8 w-8"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <i className="fa-solid fa-xmark text-xl" />
          ) : (
            <i className="fa-solid fa-bars text-xl" />
          )}
        </button>
      </div>

      {/** Mobilmenu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/** Mobilmenu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark text-2xl" />
          </button>
        </div>

        <ul className="flex flex-col space-y-2 px-6">
          {navItemsMobile.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-lg ${
                    isActive ? "font-semibold text-blue-600" : "text-gray-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 px-6">
          <h3 className="font-semibold mb-2">Konto</h3>
          <div className="border rounded-md px-4 py-2 text-gray-500">
            {loginData?.user?.firstname || "Ikke logget ind"}
          </div>

          {loginData ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setIsLoginOpen(true);
                setIsOpen(false);
              }}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/** Login Modal */}
      <LoginForm isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/** Sådan virker det Modal */}
      {isModalOpen && (
        <div className="hidden md:flex fixed inset-0 items-center justify-center bg-black/50 z-50">
          <div className="relative bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold mb-4">Sådan virker det</h2>
            <p className="text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi autem minus officia, assumenda sunt adipisci rerum praesentium eos excepturi facilis quae at fugit porro. At, perferendis. Sequi veniam in ullam.
            </p>
          </div>
        </div>
      )}

    </nav>
  );
};
