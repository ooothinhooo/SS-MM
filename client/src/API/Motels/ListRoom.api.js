import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function LIST_ROOM(auth, _id) {
  return axios({
    method: "post",
    url: `http://localhost:9000/api/motel/listroom`,
    headers: { auth: auth },
    // data,
    params: { motelId: _id },
  });
}
