import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function LIST_ROOM(auth, _id) {
  return axios({
    method: "post",
    url: URL_LIST_ROOM,
    headers: { auth: auth },
    // data,
    params: { motelId: _id },
  });
}
