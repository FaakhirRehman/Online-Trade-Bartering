import { useSelector } from 'react-redux';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const object = useSelector((state) => state.category); // Array of category object
  const { categories } = object;

  const [menuState, setMenuState] = useState(false);

  return (
    <form className="mr-5 ml-24 w-[700px] ">
      <div className="flex">
        <button
          id="dropdown-button"
          onClick={() => setMenuState(!menuState)}
          data-dropdown-toggle="dropdown"
          className="relative flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-sm hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
          type="button"
        >
          All Categories
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          id="dropdown"
          className={`z-10 ${
            !menuState ? 'hidden' : 'absolute'
          }  top-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48`}
        >
          <ul
            className="py-2 text-sm text-zinc-800 "
            aria-labelledby="dropdown-button"
          >
            {categories && categories.length !== 0 ? (
              categories.map((category, idx) => {
                return (
                  <li key={idx}>
                    <Link to={`/shop/${category._id}`}>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 border transition-all hover:bg-[#038FC4] dark:hover:bg-[#038FC4] dark:hover:text-white"
                      >
                        {category.name}
                      </button>
                    </Link>
                  </li>
                );
              })
            ) : (
              <p className="px-3">No category available</p>
            )}
          </ul>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50  border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Mockups, Logos, Design Templates..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-zinc-800  rounded-r-md  focus:ring-4 focus:outline-none focus:ring-blue-300 ="
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
