import { FIELD_SIZE } from "./index";

const BLOCK_COLOR_0 = "cyan.400";
const BLOCK_COLOR_1 = "blue.400";
const BLOCK_COLOR_2 = "orange.400";
const BLOCK_COLOR_3 = "yellow.400";
const BLOCK_COLOR_4 = "green.400";
const BLOCK_COLOR_5 = "purple.400";
const BLOCK_COLOR_6 = "red.400";

export const BLOCK_DEFAULT_PARAM = {
  columns: 4,
  rows: 4,
  x: Math.floor(FIELD_SIZE.rows / 2) - Math.floor(4 / 2),
  y: -4,
};

export const BLOCKS = [
  // 長いやつ
  [
    null,
    null,
    null,
    null,

    null,
    null,
    null,
    null,

    BLOCK_COLOR_0,
    BLOCK_COLOR_0,
    BLOCK_COLOR_0,
    BLOCK_COLOR_0,

    null,
    null,
    null,
    null,
  ],

  // Lの逆みたいなやつ
  [
    null,
    null,
    null,
    null,

    BLOCK_COLOR_1,
    null,
    null,
    null,

    BLOCK_COLOR_1,
    BLOCK_COLOR_1,
    BLOCK_COLOR_1,
    null,

    null,
    null,
    null,
    null,
  ],

  // Lみたいなやつ
  [
    null,
    null,
    null,
    null,

    null,
    null,
    BLOCK_COLOR_2,
    null,

    BLOCK_COLOR_2,
    BLOCK_COLOR_2,
    BLOCK_COLOR_2,
    null,

    null,
    null,
    null,
    null,
  ],

  // 四角
  [
    null,
    null,
    null,
    null,

    null,
    BLOCK_COLOR_3,
    BLOCK_COLOR_3,
    null,

    null,
    BLOCK_COLOR_3,
    BLOCK_COLOR_3,
    null,

    null,
    null,
    null,
    null,
  ],

  // zの逆みたいなやつ
  [
    null,
    null,
    null,
    null,

    null,
    BLOCK_COLOR_4,
    BLOCK_COLOR_4,
    null,

    BLOCK_COLOR_4,
    BLOCK_COLOR_4,
    null,
    null,

    null,
    null,
    null,
    null,
  ],

  // 三角
  [
    null,
    null,
    null,
    null,

    null,
    BLOCK_COLOR_5,
    null,
    null,

    BLOCK_COLOR_5,
    BLOCK_COLOR_5,
    BLOCK_COLOR_5,
    null,

    null,
    null,
    null,
    null,
  ],

  // Zみたいなやつ
  [
    null,
    null,
    null,
    null,

    BLOCK_COLOR_6,
    BLOCK_COLOR_6,
    null,
    null,

    null,
    BLOCK_COLOR_6,
    BLOCK_COLOR_6,
    null,

    null,
    null,
    null,
    null,
  ],
];
