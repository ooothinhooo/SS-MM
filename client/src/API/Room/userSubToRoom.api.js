import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function USERS_SUB_TOROOM(auth, roomId, memberId) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/room/upmember",
    headers: { auth: auth },
    // data: {
    //   motelName: motelName,
    // },
    params: { roomId: roomId, memberId: memberId },
  });
}
