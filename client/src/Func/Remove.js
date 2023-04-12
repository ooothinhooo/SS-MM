import diacritic from "diacritic";
export default function removeVietnameseAndWhitespace(str, rep = true) {
  str = str.trim();
  str = diacritic.clean(str);
  if (rep) {
    str = str.replace(/\s+/g, "");
  }

  return str;
}
export function extractString(url) {
  // tách chuỗi thành một mảng các phần tử dựa trên ký tự '/'
  const urlParts = url.split("/");

  // lấy phần tử cuối cùng của mảng
  const lastPart = urlParts[urlParts.length - 1];
  // tách chuỗi lastPart thành một mảng các phần tử dựa trên ký tự '%'
  const parts = lastPart.split("avt%2F");

  // lấy phần tử đầu tiên của mảng parts
  const result = parts[1];
  const x = result.split("?alt");
  console.log(x[0]);

  return x[0];
}
