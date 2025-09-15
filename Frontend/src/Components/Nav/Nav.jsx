import { NavLink } from "react-router-dom";
import { useState } from "react";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemsDesktop = [
    { name: "Find et lift", path: "/lift" },
    { name: "Sådan virker det", path: "/" },
  ];

  const navItemsMobile = [
    { name: "Forside", path: "/" },
    { name: "Find et lift", path: "/lift" },
  ];

  return (
    <nav className="ml-auto flex items-center w-full justify-between">
      {/** Desktop navigation (Efter logo) */}
      <ul className="hidden md:flex space-x-6 ml-8">
        {navItemsDesktop.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-4 ${
                  isActive
                    ? "border-b-2 border-blue-600"
                    : "text-gray-800 hover:text-blue-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/** Konto (desktop) */}
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        <span className="text-gray-800">User</span>
        <button className="px-4 py-2 text-blue-900 rounded-lg hover:bg-blue-50 transition">
          Logout
        </button>
      </div>

      {/** Mobil burger-menu */}
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
            User
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
            Login / Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
