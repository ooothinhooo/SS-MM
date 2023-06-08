import axios from "axios";
import { URL_LIST_ROOM } from "../index.js";

export function LIST_POST(page, data, fee) {
  return axios({
    method: "get",
    url: "http://localhost:9000/api/listposts",

    params: {
      page: page,
      province: data?.province,
      district: data?.district,
      ward: data?.ward,
      feeStart: fee?.feeStart,
      feeEnd: fee?.feeEnd,
    },
  });
}
