const KeyboardKey = {
  ESCAPE: `Esc`,
  ESCAPE_IE: `Escape`,
};

const ESCAPE_KEYS = [
  KeyboardKey.ESCAPE,
  KeyboardKey.ESCAPE_IE,
];

export const isEscapePress = (evt) => {
  return ESCAPE_KEYS.indexOf(evt.key) > -1;
};
