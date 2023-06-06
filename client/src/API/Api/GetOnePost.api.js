import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function GET_ONE_POST(id) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/getonepost",

    params: { _id: id },
  });
}
