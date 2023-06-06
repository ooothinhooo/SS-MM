import React, { useEffect, useState } from "react";
import BoxPost from "../../components/Post/BoxPost.jsx";
import { LIST_POST } from "../../API/Api/ListPost.api.js";

function PostPage() {
  const arr = [1, 1, 1, 1, 1, 1];
  const [data, setData] = useState();
  const [page, setPage] = useState("1");

  const GETAPI_LISTPOST = async () => {
    try {
      const result = await LIST_POST(page);
      setData(result?.data);
      console.log(result.data);
    } catch (error) {}
  };
  useEffect(() => {
    GETAPI_LISTPOST();
  }, []);

  const nextPage = () => {
    const maxPage = Math.ceil(data.length / 15);
    setPage(page > maxPage ? 1 : page + 1);
    // console.log(page);
    // getPagination();
  };
  const prevPage = () => {
    setPage(page <= 1 ? 1 : page - 1);
    // getPagination();
  };

  useEffect(() => {
    GETAPI_LISTPOST();
  }, [page]);
  return (
    <div>
      {/* xl:grid-cols-3 */}
      <ul class="grid grid-cols-1  gap-y-2 gap-x-6 items-start justify-start text-left p-8">
        {data?.map((i) => {
          return <BoxPost value={i} />;
        })}
      </ul>
      <div className="my-3 w-full   flex justify-center items-center ">
        <div className="w-[95%] flex justify-between items-center">
          <a
            onClick={(e) => prevPage()}
            class="cursor-pointer inline-flex justify-start items-center 
              px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-green-300 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Sau
          </a>
          <a
            onClick={(e) => {
              nextPage();
            }}
            class="cursor-pointer inline-flex justify-end items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg
               hover:bg-green-300 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Tiếp
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
