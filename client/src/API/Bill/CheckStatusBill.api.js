import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";


export function CHECK_STATUS_BILL(auth, roomId, ArrayChecked, ArrayNoChecked) {
  return axios
    .put(
      "http://localhost:9000/api/room/checkbill",
      {
        ArrayChecked: ArrayChecked,
        ArrayNoChecked: ArrayNoChecked,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth: auth,
        },
        params: { roomId: roomId },
      }
    )
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}