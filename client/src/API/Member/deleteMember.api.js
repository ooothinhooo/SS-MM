import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function DELETE_MEMBER(auth, _id) {
  return axios({
    method: "put",
    url: "http://localhost:9000/api/member/delete",
    headers: { auth: auth },

    params: { _id: _id },
  });
}
