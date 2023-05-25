export function randomString(length) {
  let result = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Dãy kí tự cho phép
  const charsLength = chars.length; // Độ dài của dãy kí tự cho phép

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  const x = `O${result}O`;
  return x;
}
