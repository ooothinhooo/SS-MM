import axios from "axios";
import { URL_DEPLOP, URL_LIST_ROOM } from "../index.js";

export function FIND_BILL(roomId, month) {
  return axios({
    method: "get",
    url: `${URL_DEPLOP}/api/findroombill`,
    // url: "http://localhost:9000/api/findroombill",

    params: {
      roomId: roomId,
      month: month,
    },
  });
}
