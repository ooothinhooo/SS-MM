import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function REMOVE_MEMBER_OUTROOM(auth, roomId, memberId) {
  return axios({
    method: "put",
    url: "http://localhost:9000/api/room/remove_member_out_room",
    headers: { auth: auth },
    // data: {
    //   motelName: motelName,
    // },
    params: { roomId: roomId, memberId: memberId },
  });
}
