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

function ViewRoomPage({ user }) {
  let { id } = useParams();
  const [dataRoom, setDataRoom] = useState();
  const getAPI = async () => {
    try {
      const result = await GET_ONE_ROOM(user?.token, id);
      console.log(result.data.data);
      if (result.status == 200) {
        if (result.data.status) {
          setDataRoom(result.data.data);
          console.log(dataRoom);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAPI();
  }, []);
  const data = [
    {
      label: "Thông tin phòng",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Dịch Vụ",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Thành Viên",
      value: "vue",
      desc: <Member data={dataRoom} user={user} />,
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="mt-20 mr-20">
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
              <TabsBody>
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
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
