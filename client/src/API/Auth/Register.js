import axios from "axios";

export function REGISTER(data) {
  return axios({
    method: "post",
    url: `http://localhost:9000/api/auth/register`,
    // headers: { auth: auth },
    data,
    // params: { motelId: _id },
  });
}
