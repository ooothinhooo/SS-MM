import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function REGISTER_MOTEL(auth, motelName, phone) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/motel/register_motel",
    headers: { auth: auth },
    data: {
      motelName: motelName,
      phone: phone,
    },
    // params: { motelId: _id },
  });
}
