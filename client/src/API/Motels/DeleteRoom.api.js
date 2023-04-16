import axios from "axios";

export function DELETE_ROOM(auth, roomId) {
  return axios({
    method: "delete",
    url: "http://localhost:9000/api/motel/deleteroom",
    headers: { auth: auth },
    // data: {
    //   motelName: motelName,
    // },
    params: { roomId },
  });
}
