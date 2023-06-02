import React from "react";
import { BsHouse } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdCleaningServices } from "react-icons/md";

function DashboardPage() {
  return (
    <div>
      <div className="w-full  flex justify-center items-center">
        <div className="w-[90%]">
          <div className="flex bg-blue-300 w-full justify-center items-center  p-3 rounded-lg ">
            <div className="">
              <div class="flex flex-wrap gap-4 justify-center ">
                {/* <!-- card 1 --> */}
                <div class="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[180px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                  <div class="font-semibold text-lg text-left">PHÒNG TRỌ</div>
                  <div class="font-semibold text-5xl tracking-tight flex">
                    100
                    <i className="ml-2">
                      <BsHouse />
                    </i>
                  </div>
                  <div class="font-normal text-right">Phòng</div>
                </div>

                <div class="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[180px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                  <div class="font-semibold text-lg text-left">KHÁCH THUÊ</div>
                  <div class="font-semibold text-5xl tracking-tight flex">
                    100
                    <i className="ml-2">
                      <FiUsers />
                    </i>
                  </div>
                  <div class="font-normal text-right">Thành viên</div>
                </div>
                <div class="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[180px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                  <div class="font-semibold text-lg text-left">DỊCH VỤ</div>
                  <div class="font-semibold text-5xl tracking-tight flex">
                    4
                    <i className="ml-2">
                      <MdCleaningServices />
                    </i>
                  </div>
                  <div class="font-normal text-right">dịch vụ</div>
                </div>

                {/* <!-- card 2 --> */}
                <div class="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                  <div class="font-semibold text-lg">Yesterday</div>
                  <div class="font-semibold text-5xl tracking-tight">
                    $9.524
                  </div>
                  <div class="font-normal">Gross volume</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default DashboardPage;
