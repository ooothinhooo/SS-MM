import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { MdOutlineDeleteSweep, MdHome } from "react-icons/md";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { GET_ONE_ROOM } from "../../API/Motels/GetOneRoom.api.js";

import Member from "../../components/Room/Member.jsx";
import InfoRom from "../../components/Room/InfoRom.jsx";
import ServiceRoom from "../../components/Room/ServiceRoom.jsx";



function ViewRoomPage({ user }) {
  let { id } = useParams();
  const [dataRoom, setDataRoom] = useState();
  const getAPI_Room = async () => {
    try {
      const result = await GET_ONE_ROOM(user?.token, id);

      if (result.status == 200) {
        if (result.data.status) {
          setDataRoom(result.data.data);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAPI_Room();
  }, []);
  const data = [
    {
      label: "Thông tin phòng",
      value: "info",
      desc: <InfoRom data={dataRoom} user={user} getAPI_Room={getAPI_Room} />,
    },

    {
      label: "Thành Viên",
      value: "member",
      desc: <Member data={dataRoom} user={user} />,
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="mt-20 mr-20 w-full">
        <div class="flex ">
          <div className=" w-full h-full bg-slate-100">
            <div></div>
            <Tabs value="html">
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody className="w-full">
                {data.map(({ value, desc }) => (
                  <TabPanel className="w-full" key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewRoomPage;
