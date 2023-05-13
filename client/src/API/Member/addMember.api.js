import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function ADD_MEMBER(auth, data) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/member/add",
    headers: { auth: auth },
    // data: {
    //   motelName: motelName,
    // },
    // params: { motelId: motelId, roomCode: roomCode },
    data,
  });
}
