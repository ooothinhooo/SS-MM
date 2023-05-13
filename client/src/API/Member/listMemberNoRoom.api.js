import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function LIST_MEMBER_NO_ROOM(auth, _id) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/member/listmembernoroom",
    headers: { auth: auth },

    params: { motelId: _id },
  });
}
