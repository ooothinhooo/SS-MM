import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function LIST_MEMBER_ONROOM(auth, _id) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/member/listmemberonroom",
    headers: { auth: auth },

    params: { _id: _id },
  });
}
