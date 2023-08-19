export const isBGLight = hexColor => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 127.5;
};

export const getRandomId = () => Math.floor(Math.random() * 1000) + 1;