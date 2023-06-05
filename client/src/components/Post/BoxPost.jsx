import React from "react";

function BoxPost({ value }) {
  return (
    <>
      {/* xl:flex-col */}
      <li class="relative flex flex-col sm:flex-row  items-start bg-white shadow-lg p-3 rounded-md">
        <div class="order-1 sm:ml-6 xl:ml-0 ">
          <h3 class="mb-1 text-slate-900 font-semibold dark:text-slate-200">
            <span class="mb-1 block text-sm leading-6 text-indigo-500">
              {value?.title}
            </span>
            {value?.roomFee}
          </h3>
          <div class="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
            <p>Quận Ninh Kiều Thành Phố Cần Thơ</p>
            <p>
              Mo ta chi tiet
              ............................................................................................
            </p>
          </div>
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
