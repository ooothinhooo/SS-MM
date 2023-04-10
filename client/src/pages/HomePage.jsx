import React from "react";

function HomePage() {
  return (
    <div>
      <div class="flex justify-center items-center mt-6 h-full lg:h-screen overflow-auto">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div class="bg-blue-600 pt-1 px-2 bg-gradient-to-b from-blue-400 to-blue-500 rounded-xl shadow-lg w-52">
            <div class="flex justify-center">
              <div class="flex justify-center p-4 bg-blue-400 ring-2 ring-blue-300 rounded-lg shadow-xl w-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="p-4">
              <p class="text-white font-semibold">Photos</p>
              <div class="flex justify-between mt-2">
                <p class="text-gray-200">20,100 Files</p>
                <p class="text-white">6.5GB</p>
              </div>
            </div>
          </div>

          <div class="bg-blue-600 pt-1 px-2 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-xl shadow-lg w-52">
            <div class="flex justify-center">
              <div class="flex justify-center p-4 bg-yellow-300 ring-2 ring-yellow-100 rounded-lg shadow-xl w-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
            </div>
            <div class="p-4">
              <p class="text-white font-semibold">Music</p>
              <div class="flex justify-between mt-2">
                <p class="text-gray-200">200 Files</p>
                <p class="text-white">650 MB</p>
              </div>
            </div>
          </div>

          <div class="bg-blue-600 pt-1 px-2 bg-gradient-to-b from-pink-400 to-pink-500 rounded-xl shadow-lg w-52">
            <div class="flex justify-center">
              <div class="flex justify-center p-4 bg-pink-300 ring-2 ring-pink-200 rounded-lg shadow-xl w-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="p-4">
              <p class="text-white font-semibold">Videos</p>
              <div class="flex justify-between mt-2">
                <p class="text-gray-200">150 Files</p>
                <p class="text-white">750 MB</p>
              </div>
            </div>
          </div>

          <div class="bg-blue-600 pt-1 px-2 bg-gradient-to-b from-indigo-400 to-indigo-500 rounded-xl shadow-lg w-52">
            <div class="flex justify-center">
              <div class="flex justify-center p-4 bg-indigo-300 ring-2 ring-indigo-200 rounded-lg shadow-xl w-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div class="p-4">
              <p class="text-white font-semibold">Documents</p>
              <div class="flex justify-between mt-2">
                <p class="text-gray-200">200 Files</p>
                <p class="text-white">20 MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
