import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function ADD_ROOM(auth, motelId, roomCode, category, roomFee, deposit) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/motel/addroom",
    headers: { auth: auth },
    // data: {
    //   motelName: motelName,
    // },
    params: {
      motelId: motelId,
      roomCode: roomCode,
      category: category,
      roomFee: roomFee,
      deposit: deposit,
    },
  });
}
