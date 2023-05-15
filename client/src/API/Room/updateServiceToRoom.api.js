import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function UPDATE_SERVICE_TOROOM(auth, data) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/room/update_service",
    headers: { auth: auth },
    data,
  });
}
