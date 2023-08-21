export const isBGLight = hexColor => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 127.5;
};

export const getRandomNumber = length => Math.floor(Math.random() * length) + 1;

export const rearrangeStrings = (str1, str2) => (a, b) => {
  if (a[0].startsWith(str1) && b[0].startsWith(str2)) {
    return -1;
  }
  if (a[0].startsWith(str2) && b[0].startsWith(str1)) {
    return 1;
  }
  return a[0].localeCompare(b[0]);
};

