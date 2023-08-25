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

export const groupTextsByLanguage = flavorTextEntries => {
  const languageMap = {};

  flavorTextEntries.forEach(entry => {
    const languageName = entry.language.name;

    if (!languageMap[languageName]) {
      languageMap[languageName] = [];
    }
    languageMap[languageName].push(entry.flavor_text);
  });

  return languageMap;
};

export const clickMovingScroll = slider => {
  let isDown = false;
  let startX;
  let scrollLeft;

  const targetSlider = slider;

  targetSlider?.addEventListener('mousedown', event => {
    isDown = true;
    startX = event.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  targetSlider?.addEventListener('mouseleave', () => {
    isDown = false;
  });

  targetSlider?.addEventListener('mouseup', () => {
    isDown = false;
  });

  targetSlider?.addEventListener('mousemove', event => {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // 페이지 이동 속도 조절
    slider.scrollLeft = scrollLeft - walk;
  });
};

export const findLang = (attr, language) => {
  const entry = attr.find(entry => entry.language.name === language);
  return entry ? entry.genus : undefined;
};
