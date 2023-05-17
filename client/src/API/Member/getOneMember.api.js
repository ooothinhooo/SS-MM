import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function GET_ONE_MEMBER(auth, memberId) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/member/info",
    headers: { auth: auth },
    // data: {
    //   motelName: motelName,
    // },
    params: { memberId: memberId },
  });
}
