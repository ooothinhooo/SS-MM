import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function ADD_SERVICE_TOROOM(
  auth,
  serviceId,
  ArrayChecked,
  ArrayNoChecked
) {
  return axios({
    method: "post",
    url: "http://localhost:9000/api/service/addservice",
    headers: { auth: auth },
    // data: {
    //   motelName: motelName,
    // },
    params: { serviceId: serviceId },
    data: {
      Push: ArrayChecked,
      Pull: ArrayNoChecked,
    },
  });
}
