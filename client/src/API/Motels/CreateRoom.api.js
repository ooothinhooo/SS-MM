import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

//create nhiều phòng cùng lúc
// export function CREATE_ROOM(auth, motelId, data) {
//   return axios({
//     method: "post",
//     url: "http://localhost:9000/api/motel/createroom",
//     headers: { auth: auth },
//     params: { motelId: motelId },
//     data,
//   });
// }
//create nhiều phòng cùng lúc
export function CREATE_ROOM(auth, motelId, roon) {
  console.log(roon);
  return axios
    .post(
      "http://localhost:9000/api/motel/createroom",
      {
        room: roon,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth: auth,
        },
        params: { motelId: motelId },
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
