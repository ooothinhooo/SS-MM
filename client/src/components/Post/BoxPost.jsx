import React from "react";

function BoxPost() {
  return (
    <>
      {/* xl:flex-col */}
      <li class="relative flex flex-col sm:flex-row  items-start bg-white shadow-lg p-3 rounded-md">
        <div class="order-1 sm:ml-6 xl:ml-0 ">
          <h3 class="mb-1 text-slate-900 font-semibold dark:text-slate-200">
            <span class="mb-1 block text-sm leading-6 text-indigo-500">
              Van Thinh Tran
            </span>
            1 phòng trọ còn tróng cho thuê
          </h3>
          <div class="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
            <p>Giá 10000</p>
            <p>176 nguyen thi minh khai</p>
          </div>
          <a
            class="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
            href="https://headlessui.dev"
          >
            Learn more
            <span class="sr-only">xxx</span>
            <svg
              class="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
              width="3"
              height="6"
              viewBox="0 0 3 6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M0 0L3 3L0 6"></path>
            </svg>
          </a>
        </div>
        {/* xl:mb-6 xl:w-full */}
        <img
          src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
          alt=""
          class="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 mr-2 "
          width="1216"
          height="640"
        />
      </li>
    </>
  );
}

export default BoxPost;
