import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function DELETE_POST(auth, id) {
  return axios({
    method: "delete",
    url: "http://localhost:9000/api/posts/delete",
    headers: { auth: auth },

    params: { _id: id },
  });
}
