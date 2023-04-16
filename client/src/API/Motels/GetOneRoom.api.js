import axios from "axios";

export function GET_ONE_ROOM(auth, roomId) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/motel/getoneroom",
    headers: { auth: auth },
    params: { roomId },
  });
}
