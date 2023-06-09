import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function UPDATE_USER(auth, data) {
  return axios({
    method: "put",
    url: "http://localhost:9000/api/user/updateinfo",
    headers: { auth: auth },
    data,
    // params: { motelId: _id },
  });
}
