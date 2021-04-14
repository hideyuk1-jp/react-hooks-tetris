import { FIELD_SIZE } from "../constants";
import { BLOCK_DEFAULT_PARAM, BLOCKS } from "../constants/blocks";
import { Field } from "../components/game-root";

export interface DropBlockData {
  columns: number;
  rows: number;
  x: number;
  y: number;
  data: (null | string)[];
}

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

// 落ちブロックを生成
export const createBlock = () => {
  const data = BLOCKS[getRandomNumber(BLOCKS.length)];

  return {
    ...BLOCK_DEFAULT_PARAM,
    data,
  };
};

// 落ちブロックを回転したブロックデータを返す
export const getRotatedBlockData = (blockData: DropBlockData) => {
  const w = blockData.columns;
  const rotatedData = [...blockData.data];
  blockData.data.forEach((v, i) => {
    const y = Math.floor(i / w);
    const x = i % w;
    rotatedData[x * w + (w - 1 - y)] = v;
  });
  return {
    ...blockData,
    columns: blockData.rows,
    rows: blockData.columns,
    data: rotatedData,
  };
};

// 重なり判定（移動可能か、落下可能か）
export const checkHit = (blockData: DropBlockData, field: Field) => {
  for (let i = 0; i < blockData.rows; i++) {
    for (let j = 0; j < blockData.columns; j++) {
      if (blockData.data[i * blockData.columns + j] === null) continue;

      // フィールド外の判定
      if (
        blockData.x + j < 0 ||
        blockData.x + j > FIELD_SIZE.rows - 1 ||
        blockData.y + i > FIELD_SIZE.columns - 1
      ) {
        return true;
      }

      if (field[blockData.x + j + (blockData.y + i) * FIELD_SIZE.rows]) {
        return true;
      }
    }
  }
  return false;
};

// ドロップブロックをフィールドに反映
export const setDrop2Field: (
  blockData: DropBlockData,
  field: Field
) => Field = (blockData, field) => {
  const newField = field.slice();
  for (let i = 0; i < blockData.rows; i++) {
    for (let j = 0; j < blockData.columns; j++) {
      const blockValue = blockData.data[i * blockData.columns + j];
      if (blockValue === null) continue;

      newField[
        blockData.x + j + (blockData.y + i) * FIELD_SIZE.rows
      ] = blockValue;
    }
  }
  return newField;
};

// ゲームオーバー判定
export const isGameOvered = (blockData: DropBlockData) => {
  for (let i = 0; i < blockData.rows; i++) {
    for (let j = 0; j < blockData.columns; j++) {
      if (blockData.data[i * blockData.columns + j] === null) continue;

      // ドロップブロックがフィールドより上に止まっていたらゲームオーバー
      if (blockData.y + i < 0) {
        return true;
      }
    }
  }
  return false;
};

// 埋まった行の数とを埋まった行を消したあとのフィールドを返す
export const clearFilledRows = (field: Field) => {
  const clearedField = [...Array(FIELD_SIZE.rows * FIELD_SIZE.columns)];
  let _y = FIELD_SIZE.columns - 1;
  let clearedLines = 0;

  for (let i = FIELD_SIZE.columns - 1; i >= 0; i--) {
    // 下から順に処理
    let isCleared = true;
    for (let j = 0; j < FIELD_SIZE.rows; j++) {
      let fieldBlock = field[i * FIELD_SIZE.rows + j];
      if (!fieldBlock) isCleared = false;
    }

    if (isCleared) {
      clearedLines++;
    } else {
      for (let j = 0; j < FIELD_SIZE.rows; j++) {
        clearedField[_y * FIELD_SIZE.rows + j] = field[i * FIELD_SIZE.rows + j];
      }
      _y--;
    }
  }

  return { clearedLines, clearedField };
};
