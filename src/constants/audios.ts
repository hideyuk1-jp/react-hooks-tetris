import bgm from "../assets/audios/bgm.mp3";
import move from "../assets/audios/move.mp3";
import hit from "../assets/audios/hit.mp3";
import drop from "../assets/audios/drop.mp3";
import clearLine from "../assets/audios/clear-line.mp3";
import gameover from "../assets/audios/gameover.mp3";

// BGM
export const audioBGM = new Audio(bgm);

// 手動移動/回転サウンド
export const audioMove = new Audio(move);

// 移動失敗サウンド
export const audioHit = new Audio(hit);

// 自由落下サウンド
export const audioDrop = new Audio(drop);

// 行消去サウンド
export const audioClearLine = new Audio(clearLine);

// ゲームオーバーサウンド
export const audioGameover = new Audio(gameover);

// カウントダウンサウンド
export const audioCountdown = new Audio(move);
