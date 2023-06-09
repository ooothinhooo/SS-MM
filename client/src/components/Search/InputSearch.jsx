import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputSearch() {
  const navigation = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // const value = removeVietnameseAndWhitespace(
      //   searchValue.toLocaleLowerCase(),
      //   false
      // );
      const value = searchValue;
      navigation(`/search/${value}`);
    }
  };
  return (
    <div>
      <div action="#" method="GET" class="hidden lg:block lg:pl-32">
        <label for="topbar-search" class="sr-only">
          Search
        </label>
        <div class="mt-1 relative lg:w-64">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            id="search"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}

export default InputSearch;
