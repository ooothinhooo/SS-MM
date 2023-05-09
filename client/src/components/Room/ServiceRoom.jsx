import React from "react";

function ServiceRoom({ data, user }) {
  return (
    <div className="w-full bg-blue-gray-200">
      <div className="absolute flex z-40 items-end mt-28 bottom-0  right-0">
        <div className="bg-red-600  p-4 rounded-full">
          <button>Thêm +</button>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Chọn
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Dịch vụ sử dụng
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Đơn giá (VNĐ)
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Số lượng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    <tr class="bg-gray-100 border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        1
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Điện
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input type="text" />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input type="text" />
                      </td>
                    </tr>
                    <tr class="bg-gray-100 border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        2
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Nước
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input type="text" />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input type="text" />
                      </td>
                    </tr>
                    <tr class="bg-gray-100 border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        3
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Gửi xe máy
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input type="text" />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input type="text" />
                      </td>
                    </tr>
                    <tr class="bg-gray-100 border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        4
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Rác
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input type="text" />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input type="text" />
                      </td>
                    </tr>
                  </>

                  <div className="w-full h-10"></div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceRoom;
