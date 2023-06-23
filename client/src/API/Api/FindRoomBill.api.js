import axios from "axios";
import { URL_DEPLOP, URL_LIST_ROOM } from "../index.js";

export function FIND_BILL(roomId, month) {
  return axios({
    method: "get",
    url: `${URL_DEPLOP}/api/findroombill`,
    // url:"https://api-ss-mm.onrender.com/api/findroombill",

    params: {
      roomId: roomId,
      month: month,
    },
  });
}
