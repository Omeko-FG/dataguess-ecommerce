import React from "react";
import { EventFunc } from "../../models/models";

interface ISearchComp {
  handleChange: EventFunc;
}

const SearchComp:React.FC<ISearchComp> = ({handleChange}) => {
  return (
    <div className="p-5 mt-5">
      <div className="relative w-full sm:w-10/12 md:w-3/4 lg:w-1/2 mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block outline-none w-full p-4 pl-10 font-medium text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-300 focus:border-purple-300 focus:bg-slate-100 focus:text-gray-900"
          placeholder="Search products..."
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchComp;
