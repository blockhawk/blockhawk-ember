export default function hexToString(hex) {
  const stripped = hex.slice(2);
  let result = '';
  for (let i = 0; i < stripped.length; i += 2) {
    const charCode = parseInt(stripped.substr(i, 2), 16);
    if (charCode !== 0) {
      result += String.fromCharCode(charCode);
    }
  }
  return result;
}
