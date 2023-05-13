import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function LIST_MEMBER(auth, motelId) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/member/listmember",
    headers: { auth: auth },

    params: { motelId: motelId },
  });
}
