import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function CHANGE_PASS(auth, oldPassword, password) {
  return axios({
    method: "put",
    url: "http://localhost:9000/api/user/updatepass",
    headers: { auth: auth },
    // data,
    params: { oldPassword: oldPassword, password: password },
  });
}
