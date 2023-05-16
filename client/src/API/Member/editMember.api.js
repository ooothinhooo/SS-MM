import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function EDIT_MEMBER(auth, memberId, data) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/member/edit",
    headers: { auth: auth },
    params: { memberId: memberId },
    data,
  });
}
