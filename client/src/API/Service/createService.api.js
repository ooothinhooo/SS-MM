import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function CREATE_SERVICE(auth, motelId, name, value, unit) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/service/create",
    headers: { auth: auth },
    params: { motelId: motelId, name: name, value: value, unit: unit },
  });
}
