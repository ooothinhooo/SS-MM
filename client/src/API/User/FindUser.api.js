import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function FIND_USER(auth, _id) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/user/find",
    headers: { auth: auth },
    // data,
    params: { _id: _id },
  });
}
