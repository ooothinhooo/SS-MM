import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function GET_USER(auth) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/user/get",
    headers: { auth: auth },
    // data,
    // params: { motelId: _id },
  });
}
