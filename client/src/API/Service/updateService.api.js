import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function UPDATE_SERVICE(auth, motelId, serviceId, data) {
  return axios({
    method: "put",
    url: "http://localhost:9000/api/service/update",
    headers: { auth: auth },
    params: { motelId: motelId, serviceId: serviceId },
    data,
  });
}
