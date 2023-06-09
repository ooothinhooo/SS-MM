import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function SEARCH_POST(q) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/search",

    params: {
      q: q,
    },
  });
}
