import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function GET_LIST_SERVICE(auth, motelId) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/service/listservice",
    headers: { auth: auth },
    params: { motelId: motelId },
  });
}
