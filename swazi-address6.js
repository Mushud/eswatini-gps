// swazi-address6.js
const BASE34_CHARS = "123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function base34encode(num, length) {
  let str = "";
  while (num > 0) {
    str = BASE34_CHARS[num % 34] + str;
    num = Math.floor(num / 34);
  }
  return str.padStart(length, "1"); // pad with '1' (represents zero)
}
function base34decode(str) {
  let num = 0;
  for (const char of str) {
    num = num * 34 + BASE34_CHARS.indexOf(char);
  }
  return num;
}

function encode(lat, lng) {
  const minLat = -27.3,
    maxLat = -25.5;
  const minLng = 30.8,
    maxLng = 32.2;

  const rows = 5000,
    cols = 5000;

  const latIndex = Math.floor(((lat - minLat) / (maxLat - minLat)) * rows);
  const lngIndex = Math.floor(((lng - minLng) / (maxLng - minLng)) * cols);

  const rowCode = base34encode(latIndex, 3);
  const colCode = base34encode(lngIndex, 3);

  return `ES-${rowCode}-${colCode}`;
}

function decode(code) {
  console.log(code);
  if (!/^ES-[1-9A-Z]{3}-[1-9A-Z]{3}$/.test(code)) {
    throw new Error("Invalid code format");
  }

  const parts = code.split("-");
  const rowCode = parts[1];
  const colCode = parts[2];

  const latIndex = base34decode(rowCode);
  const lngIndex = base34decode(colCode);

  const minLat = -27.3,
    maxLat = -25.5;
  const minLng = 30.8,
    maxLng = 32.2;

  const rows = 5000,
    cols = 5000;

  const lat = minLat + (latIndex + 0.5) * ((maxLat - minLat) / rows);
  const lng = minLng + (lngIndex + 0.5) * ((maxLng - minLng) / cols);

  return {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };
}

module.exports = { encode, decode };
