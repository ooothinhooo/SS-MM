import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function INTERACT_POST(auth, id) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/posts/interact",
    headers: { auth: auth },

    params: { _id: id },
  });
}
