import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function LOGIN(data) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/auth/login",
    // headers: { auth: auth },
    data,
    // params: { motelId: _id },
  });
}
