import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function CREATE_POST(auth, data) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/posts/create",
    headers: { auth: auth },
    data,
    // data: {
    //   motelName: motelName,
    // },
    // params: { roomId: roomId, memberId: memberId },
  });
}
