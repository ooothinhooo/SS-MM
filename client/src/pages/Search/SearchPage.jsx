import React, { useEffect, useState } from "react";
import { SEARCH_POST } from "../../API/Api/Search.api.js";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BoxPost from "../../components/Post/BoxPost.jsx";
import Qc1 from "../../components/Banner/Qc1.jsx";

function SearchPage({ user }) {
  let { q } = useParams();
  const [value, setValue] = useState();

  const Call_Data_Search = async () => {
    const result = await SEARCH_POST(q);
    // console.log(q);
    console.log(result);
    setValue(result?.data?.data);
  };
  useEffect(() => {
    Call_Data_Search();
  }, [q]);
  // console.log(q);
  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%]">
          <div class="grid grid-cols-4 gap-2">
            <div class="flex justify-center items-center w-full">
              <div>
                <Qc1 />
              </div>
            </div>
            <div class="col-span-2 ">
              <ul class="grid grid-cols-1  gap-y-2 gap-x-6 items-start justify-start text-left">
                <ToastContainer />
                {value?.map((item) => {
                  return (
                    <BoxPost
                      user={user}
                      value={item}
                      GETAPI_LISTPOST={Call_Data_Search}
                    />
                  );
                })}
              </ul>
            </div>
            <div class="flex justify-center items-center w-full">
              <div>
                <Qc1 />
              </div>
            </div>
          </div>
          {/* xl:grid-cols-3 */}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
