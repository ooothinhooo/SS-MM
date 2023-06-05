import axios from "axios";

const host = "https://provinces.open-api.vn/api/";
export var callAPI = (api) => {
  return axios.get(api).then((response) => {
    // renderData(response.data, "province");
    // console.log(response.data);
    return response.data;
  });
};
// callAPI("https://provinces.open-api.vn/api/?depth=1");
export var callApiDistrict = (api) => {
  return axios.get(api).then((response) => {
    // renderData(response.data.districts, "district");
    // console.log(response);
    return response.data.districts;
  });
};
export var callApiWard = (api) => {
  return axios.get(api).then((response) => {
    // renderData(response.data.wards, "ward");
    // console.log(response);
    return response.data.wards;
  });
};

// var renderData = (array, select) => {
//     let row = ' <option disable value="">chọn</option>';
//     array.forEach(element => {
//         row += `<option value="${element.code}">${element.name}</option>`
//     });
//     document.querySelector("#" + select).innerHTML = row
// }

// $("#province").change(() => {
//     callApiDistrict(host + "p/" + $("#province").val() + "?depth=2");
//     printResult();
// });
// $("#district").change(() => {
//     callApiWard(host + "d/" + $("#district").val() + "?depth=2");
//     printResult();
// });
