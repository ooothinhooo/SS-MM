import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function CHECK_STATUS_BILL(auth, roomId, data) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/room/updatebill",
    headers: { auth: auth },
    params: { roomId: roomId },
    data,
  });
}
