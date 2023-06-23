import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function FIND_BILL(roomId, month) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/findroombill",

    params: {
      roomId: roomId,
      month: month,
    },
  });
}
