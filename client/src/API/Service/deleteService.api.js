import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function DELETE_SERVICE(auth, motelId, serviceId) {
  return axios({
    method: "delete",
    url: "http://localhost:9000/api/service/delete",
    headers: { auth: auth },
    params: { serviceId: serviceId, motelId: motelId },
  });
}
