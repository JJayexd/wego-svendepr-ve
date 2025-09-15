/** Sådan laver du en note */
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Find et lift", path: "/lift" },
        { name: "Sådan virker det", path: "/" },
        { name: "Min side", path: "/a" },
        { name: "Login", path: "/b" },
    ]

    return (
        <nav className="border-box ml-auto">
            {/** Burger-menu for Mobil */}
            <div className="sm:hidden">
                <button
                    className="flex items-center justify-center h-8 w-8 mt-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                {isOpen ? (
                    <i className="fa-solid fa-xmark text-xl absolute right-4" />
                ) : (
                    <i className="fa-solid fa-bars text-xl absolute right-4" />
                )}
                </button>
            </div>
            
            {/** Nav for Desktop */}
            <ul className="hidden md:flex md:space-x-2 md:ml-auto">
                {navItems.map((item, index) => {
                    const lastIndex = navItems.length - 1;
                    const secondLastIndex = navItems.length - 2;

                    let liClasses = "";
                    if (index === lastIndex) {
                    liClasses = "bg-blue-100 text-blue-600 rounded-md";
                    }

                    return (
                        <li key={item.path} className={liClasses}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `block px-4 py-2  ${
                                    isActive ? "border-b-3 border-blue-500" : ""
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    );
                })}
                </ul>



            {/** Nav for Mobil */}
            {isOpen && (
                <div className="w-screen mt-2">
                    <ul className="md:hidden flex flex-col">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                `block px-4 py-2 ${
                                    isActive ? "bg-gray-100 font-semibold" : ""
                                }`}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                    </ul>
                </div>
            )}
        </nav>
    )
}