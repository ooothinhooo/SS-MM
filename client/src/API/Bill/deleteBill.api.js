import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function DELETE_BILL(auth, roomId, month) {
  return axios({
    method: "delete",
    url: "http://localhost:9000/api/room/deletebill",
    headers: { auth: auth },
    params: { roomId: roomId, month: month },
    // data,
  });
}
