import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function DELETE_ALL_BILL(auth, roomId) {
  return axios({
    method: "delete",
    url: "http://localhost:9000/api/room/deleteallbill",
    headers: { auth: auth },
    params: { roomId: roomId },
  });
}
