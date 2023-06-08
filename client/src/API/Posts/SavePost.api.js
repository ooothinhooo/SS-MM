import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function SAVE_POST(auth, id) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/posts/save",
    headers: { auth: auth },

    params: { _id: id },
  });
}
