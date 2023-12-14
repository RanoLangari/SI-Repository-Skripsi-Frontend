import React, { useState } from "react";

const UploadSkripsi = () => {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {/* create modern navbar using tailwind */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            {/* set logo FEB.png */}
            <div className="flex space-x-7">
              <div>
                {/* image icon */}
                <a href="#" className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">
                    Sistem Informasi Repository Skripsi
                  </span>
                </a>
              </div>
              {/* primary navbar items */}
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="/dashboard"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="py-4 px-5 text-yellow-300 border-b-4 border-yellow-300 font-semibold"
                >
                  Upload Skripsi
                </a>
              </div>
            </div>
            {/* secondary navbar items */}
            <div className="hidden md:flex items-center space-x-3 ">
              {/* dropdown profile list item */}
              <div className="flex flex-col md:flex-row items-center md:space-x-3 ">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <span>Profile</span>
                      {/* chevron down icon */}
                      <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        {/* chevron down icon */}
                        <path
                          fillRule="evenodd"
                          d="M6.293 6.293a1 1 0 011.414 0L10
                          8.586l2.293-2.293a1 1 0 111.414 1.414l-3
                          3a1 1 0 01-1.414 0l-3-3a1 1 0
                          010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {/* dropdown profile items */}
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                    hidden={showMenu ? "" : "hidden"}
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 hover:text-white transition duration-300"
                        role="menuitem"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray
                        -700 hover:bg-yellow-300 hover:text-white transition duration-300"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="outline-none mobile-menu-button"
                onClick={showMenuToggle}
              >
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-yellow-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showMenu ? (
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* mobile menu */}
          {showMenu && (
            <div className="md:hidden mt-2">
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Upload Skripsi
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Profile
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Log out
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* end of navbar */}

      {/* start of hero section */}
      {/* <section className="bg-yellow-300 py-20 px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="w-1/2">
            <h1 className="text-white text-6xl font-semibold">
              Belajar pemrograman web dengan mudah
            </h1>
            <p className="text-gray-300 text-2xl mt-8 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              quibusdam, quia, voluptatum, voluptates voluptate quod quos
              doloribus debitis tempora eveniet voluptatibus. Quisquam
              quibusdam, quia, voluptatum, voluptates voluptate quod quos
              doloribus debitis tempora eveniet voluptatibus.
            </p>
            <button className="block bg-white hover:bg-gray-100 py-3 px-4 mt-10 rounded-lg shadow-lg uppercase font-semibold">
              Get Started
            </button>
          </div>
          <div className="w-1/2">
            <img src="https://source.unsplash.com/IXUM4cJynP0" alt="" />
          </div>
        </div>
      </section> */}
      {/* end of hero section */}
    </div>
  );
};

export default UploadSkripsi;
