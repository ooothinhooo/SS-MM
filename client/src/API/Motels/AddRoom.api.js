import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function ADD_ROOM(auth, motelId, roomCode) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/motel/addroom",
    headers: { auth: auth },
    // data: {
    //   motelName: motelName,
    // },
    params: { motelId: motelId, roomCode: roomCode },
  });
}
