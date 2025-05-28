const BASE34_CHARS = "123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function base34encode(num, length) {
  let str = "";
  while (num > 0) {
    str = BASE34_CHARS[num % 34] + str;
    num = Math.floor(num / 34);
  }
  return str.padStart(length, "1");
}

function base34decode(str) {
  let num = 0;
  for (const char of str) {
    num = num * 34 + BASE34_CHARS.indexOf(char);
  }
  return num;
}

function encode(lat, lng) {
  const minLat = -27.3, maxLat = -25.5;
  const minLng = 30.8, maxLng = 32.2;
  const rows = 100000, cols = 100000;

  const latIndex = Math.floor(((lat - minLat) / (maxLat - minLat)) * rows);
  const lngIndex = Math.floor(((lng - minLng) / (maxLng - minLng)) * cols);

  const rowCode = base34encode(latIndex, 5);  // Increased length
  const colCode = base34encode(lngIndex, 5);

  return `ES-${rowCode}-${colCode}`;
}

function decode(code) {
  if (!/^ES-[1-9A-Z]{5}-[1-9A-Z]{5}$/.test(code)) {
    throw new Error("Invalid code format");
  }

  const parts = code.split("-");
  const rowCode = parts[1];
  const colCode = parts[2];

  const latIndex = base34decode(rowCode);
  const lngIndex = base34decode(colCode);

  const minLat = -27.3, maxLat = -25.5;
  const minLng = 30.8, maxLng = 32.2;
  const rows = 100000, cols = 100000;

  const latStep = (maxLat - minLat) / rows;
  const lngStep = (maxLng - minLng) / cols;

  const lat = minLat + latIndex * latStep;
  const lng = minLng + lngIndex * lngStep;

  return { lat, lng };
}

module.exports = { encode, decode };
