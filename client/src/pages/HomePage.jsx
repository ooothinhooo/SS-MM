import React from "react";

function HomePage() {
  return (
    <>
      <>
        <div class="h-full  overflow-y-auto">
          {/*
      <!-- Remove everything INSIDE this div to a really blank page --> */}

          {/*
      <!-- Main Contents --> */}

          <div class="block md:grid md:grid-flow-row-dense md:grid-cols-3 md:grid-rows-3 ">
            <div class="col-span-2">
              <div class="pt-10">
                {/* <div class="bg-white shadow rounded-lg mb-6 p-4 w-full md:w-3/4">
                  <textarea
                    name="message"
                    placeholder="Type something..."
                    class=" focus:outline-none  w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                  ></textarea>
                  <footer class="flex justify-between mt-2">
                    <div class="flex gap-2">
                      <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="css-i6dzq1"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </span>
                      <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="css-i6dzq1"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </span>
                      <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="css-i6dzq1"
                        >
                          <polyline points="4 17 10 11 4 5"></polyline>
                          <line x1="12" y1="19" x2="20" y2="19"></line>
                        </svg>
                      </span>
                    </div>
                    <button class="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">
                      Send
                      <svg
                        class="ml-1"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </footer>
                </div> */}
              </div>
              <div class="bg-white shadow rounded-lg my-2 mb-6">
                <div class="flex flex-row px-2 py-3 mx-3">
                  <div class="w-auto h-auto rounded-full">
                    <img
                      class="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                      alt="User avatar"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80"
                    />
                  </div>
                  <div class="flex flex-col mb-2 ml-4 mt-1">
                    <div class="text-gray-600 text-sm font-semibold">
                      John Doe
                    </div>
                    <div class="flex w-full mt-1">
                      <div class="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                        SEO
                      </div>
                      <div class="text-gray-400 font-thin text-xs">
                        • 30 seconds ago
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-b border-gray-100"></div>
                <div class="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                  <div class="grid grid-cols-6 col-span-2   gap-2  ">
                    <div class=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                      <img
                        class="h-full w-full object-cover "
                        src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div class=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                      <img
                        class="h-full w-full object-cover  "
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1399&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div class=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                      <img
                        class="h-full w-full object-cover "
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div class=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                      <img
                        class="h-full w-full object-cover "
                        src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div class="relative overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                      <img
                        class="h-full w-full object-cover "
                        src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=765&amp;q=80"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="text-gray-500 text-sm mb-6 mx-3 px-2">
                  Lorem Ipsum is simply dummy ...{" "}
                  <span class="text-gray-400">more</span>
                </div>
                <div class="flex justify-start mb-4 border-t border-gray-100">
                  <div class="flex w-full mt-1 pt-2 pl-5">
                    <span class="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        ></path>
                      </svg>
                    </span>
                    <img
                      class="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                  </div>
                  <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                    <span class="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                    </span>
                    <span class="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                      <svg
                        class="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex w-full border-t border-gray-100">
                  <div class="mt-3 mx-5 flex flex-row text-xs">
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Comments:<div class="ml-1 text-gray-400 text-ms"> 30</div>
                    </div>
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Views: <div class="ml-1 text-gray-400 text-ms"> 60k</div>
                    </div>
                  </div>
                  <div class="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div class="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
                      Likes:{" "}
                      <div class="ml-1 text-gray-400  text-ms"> 120k</div>
                    </div>
                  </div>
                </div>

                <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                  <img
                    class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80"
                  />
                  <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                    <button
                      type="submit"
                      class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                    >
                      <svg
                        class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                    placeholder="Post a comment..."
                    autocomplete="off"
                  />
                </div>
              </div>

              <div class="bg-white shadow rounded-lg pb-4">
                <div class="flex flex-row px-2 py-3 mx-3">
                  <div class="w-auto h-auto rounded-full border-2 border-green-500">
                    <img
                      class="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                      alt="User avatar"
                      src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"
                    />
                  </div>
                  <div class="flex flex-col mb-2 ml-4 mt-1">
                    <div class="inline flex text-gray-600 text-sm font-semibold">
                      <span class="flex-1 flex-shrink-0">Sara_Lauren</span>
                      <span class="mx-1 flex-1 flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g data-name="21. Verified" id="_21._Verified">
                            <path d="M22.51,13.76a3,3,0,0,1,0-3.52l.76-1.05a1,1,0,0,0,.14-.9,1.018,1.018,0,0,0-.64-.64l-1.23-.4A2.987,2.987,0,0,1,19.47,4.4V3.1a1,1,0,0,0-1.31-.95l-1.24.4a3,3,0,0,1-3.35-1.09L12.81.41a1.036,1.036,0,0,0-1.62,0l-.76,1.05A3,3,0,0,1,7.08,2.55l-1.24-.4a1,1,0,0,0-1.31.95V4.4A2.987,2.987,0,0,1,2.46,7.25l-1.23.4a1.018,1.018,0,0,0-.64.64,1,1,0,0,0,.14.9l.76,1.05a3,3,0,0,1,0,3.52L.73,14.81a1,1,0,0,0-.14.9,1.018,1.018,0,0,0,.64.64l1.23.4A2.987,2.987,0,0,1,4.53,19.6v1.3a1,1,0,0,0,1.31.95l1.23-.4a2.994,2.994,0,0,1,3.36,1.09l.76,1.05a1.005,1.005,0,0,0,1.62,0l.76-1.05a3,3,0,0,1,3.36-1.09l1.23.4a1,1,0,0,0,1.31-.95V19.6a2.987,2.987,0,0,1,2.07-2.85l1.23-.4a1.018,1.018,0,0,0,.64-.64,1,1,0,0,0-.14-.9Zm-5.8-3.053-5,5a1,1,0,0,1-1.414,0l-3-3a1,1,0,1,1,1.414-1.414L11,13.586l4.293-4.293a1,1,0,0,1,1.414,1.414Z" />
                          </g>
                        </svg>
                      </span>
                    </div>
                    <div class="flex w-full mt-1">
                      <div class="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                        UX Design
                      </div>
                      <div class="text-gray-400 font-thin text-xs">
                        • 1 day ago
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-b border-gray-100 p-4"></div>

                <div class="text-gray-600 font-semibold  mb-2 mx-3 px-2">
                  Love and gratitude
                </div>
                <div class="text-gray-500 text-sm mb-6 mx-3 px-2">
                  Love and gratitude to both The Prime Minister, The Honorable
                  Mia Amor Mottley and our President, Her Excellency The Most
                  Honorable Dame Sandra Mason for trusting me with this honor!
                </div>
                <div class="flex justify-start mb-4 border-t border-gray-100">
                  <div class="flex w-full mt-1 pt-2 pl-5">
                    <span class="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        ></path>
                      </svg>
                    </span>
                    <img
                      class="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                  </div>
                  <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                    <span class="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                    </span>
                    <span class="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                      <svg
                        class="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex w-full border-t border-gray-100">
                  <div class="mt-3 mx-5 flex flex-row text-xs">
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Comments:<div class="ml-1 text-gray-400 text-ms"> 30</div>
                    </div>
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Views: <div class="ml-1 text-gray-400 text-ms"> 60k</div>
                    </div>
                  </div>
                  <div class="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div class="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
                      Likes: <div class="ml-1 text-gray-400 text-ms"> 120k</div>
                    </div>
                  </div>
                </div>
                <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                  <img
                    class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80"
                  />
                  <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                    <button
                      type="submit"
                      class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                    >
                      <svg
                        class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                    placeholder="Post a comment..."
                    autocomplete="off"
                  />
                </div>
              </div>

              <div class="bg-white shadow rounded-lg mt-10">
                <div class="flex flex-row px-2 py-3 mx-3">
                  <div class="w-auto h-auto rounded-full border-2 border-green-500">
                    <img
                      class="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                      alt="User avatar"
                      src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"
                    />
                  </div>
                  <div class="flex flex-col mb-2 ml-4 mt-1">
                    <div class="text-gray-600 text-sm font-semibold">
                      Sara Lauren
                    </div>
                    <div class="flex w-full mt-1">
                      <div class="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                        UX Design
                      </div>
                      <div class="text-gray-400 font-thin text-xs">
                        • 1 day ago
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-b border-gray-100"></div>
                <div class="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                  <img
                    class="rounded w-full"
                    src="https://picsum.photos/536/354"
                  />
                </div>
                <div class="text-gray-600 font-semibold  mb-2 mx-3 px-2">
                  Dummy text of the printing and typesetting industry
                </div>
                <div class="text-gray-500 text-sm mb-6 mx-3 px-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500
                </div>
                <div class="flex justify-start mb-4 border-t border-gray-100">
                  <div class="flex w-full mt-1 pt-2 pl-5">
                    <span class="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        ></path>
                      </svg>
                    </span>
                    <img
                      class="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                  </div>
                  <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                    <span class="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                    </span>
                    <span class="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                      <svg
                        class="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex w-full border-t border-gray-100">
                  <div class="mt-3 mx-5 flex flex-row text-xs">
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Comments:<div class="ml-1 text-gray-400 text-ms"> 30</div>
                    </div>
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Views: <div class="ml-1 text-gray-400 text-ms"> 60k</div>
                    </div>
                  </div>
                  <div class="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div class="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
                      Likes: <div class="ml-1 text-gray-400 text-ms"> 120k</div>
                    </div>
                  </div>
                </div>
                <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                  <img
                    class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80"
                  />
                  <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                    <button
                      type="submit"
                      class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                    >
                      <svg
                        class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                    placeholder="Post a comment..."
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
            <div class="hidden md:block lg:block py-8  sticky top-6">
              <input
                type="search"
                class="ml-16 w-3/4 py-2 pl-4 px-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-gray-50 focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                placeholder="Search"
                autocomplete="off"
              />
              <card class=" w-96 rounded-lg shadow-lg">
                <header class="font-bold text-2xl px-5 py-4">
                  Who to follow
                </header>

                <main class="px-5">
                  <content class="grid grid-cols-6">
                    <div class="">
                      <img
                        src="https://picsum.photos/200/200"
                        class="h-8 w-8 rounded-full"
                      />
                    </div>

                    <div class="col-span-3 px-1 font-semibold flex flex-col">
                      <div class="text-sm"> Sangwa Albine </div>
                      <div class="text-xm text-gray-700 font-light">
                        {" "}
                        @__svngwa._{" "}
                      </div>
                    </div>

                    <div class="col-span-2 py-2 justify-self-end">
                      <button class=" text-blue-500 text-xs font-semibold text-md rounded-full py-1 px-4">
                        .Follow
                      </button>
                    </div>
                  </content>

                  <content class="grid grid-cols-6 mt-6">
                    <div class="">
                      <img
                        src="https://picsum.photos/200/200?i=200"
                        class="h-8 w-8 rounded-full"
                      />
                    </div>

                    <div class="col-span-3 px-1 font-semibold flex flex-col ">
                      <div class="text-sm"> Mbonyintege </div>
                      <div class="text-xm text-gray-700 font-light"> @Cpwr</div>
                    </div>

                    <div class="col-span-2 py-2 justify-self-end">
                      <button class=" text-blue-500 text-xs font-semibold text-md rounded-full py-1 px-4">
                        .Follow
                      </button>
                    </div>
                  </content>
                </main>
              </card>

              <div class="max-w-sm rounded-lg overflow-hidden shadow-sm m-4 mt-5">
                {/*
            <!--first trending tweet--> */}
                <div class="flex">
                  <div class="flex-1">
                    <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                      1 . Trending
                    </p>
                    <h2 class="px-4 ml-2 w-48 font-bold ">#Microsoft363</h2>
                    <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                      5,466 posts
                    </p>
                  </div>
                  <div class="flex-1 px-4 py-2 m-2">
                    <a
                      href=""
                      class=" text-2xl rounded-full text-gray-400 hover:bg-gray-800 hover:text-blue-300 float-right"
                    >
                      <svg
                        class="m-2 h-5 w-5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </a>
                  </div>
                </div>

                {/*
            <!--second trending tweet--> */}

                <div class="flex">
                  <div class="flex-1">
                    <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                      2 . Politics . Trending
                    </p>
                    <h2 class="px-4 ml-2 w-48 font-bold ">#HI-Fashion</h2>
                    <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                      8,464 posts
                    </p>
                  </div>
                  <div class="flex-1 px-4 py-2 m-2">
                    <a
                      href=""
                      class=" text-2xl rounded-full text-gray-400 hover:bg-gray-800 hover:text-blue-300 float-right"
                    >
                      <svg
                        class="m-2 h-5 w-5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </a>
                  </div>
                </div>

                {/*
            <!--third trending tweet--> */}

                <div class="flex">
                  <div class="flex-1">
                    <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                      3 . Rock . Trending
                    </p>
                    <h2 class="px-4 ml-2 w-48 font-bold ">#Ferrari</h2>
                    <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                      5,586 Concepts
                    </p>
                  </div>
                  <div class="flex-1 px-4 py-2 m-2">
                    <a
                      href=""
                      class=" text-2xl rounded-full text-gray-400 hover:bg-gray-800 hover:text-blue-300 float-right"
                    >
                      <svg
                        class="m-2 h-5 w-5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                {/*
            <!--show more--> */}
                <div class="flex">
                  <div class="flex-1 p-4">
                    <h2 class="px-4 ml-2 w-48 font-semibold text-sm text-blue-400">
                      Show more
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default HomePage;