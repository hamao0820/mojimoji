import { MojiColor } from "./moji";

export const Config = {
    fontHeight: 33,

    stageCols: 6, // ステージの横の個数
    stageRows: 12, // ステージの縦の個数

    mojiImgWidth: 40, // ぷよぷよ画像の幅
    mojiImgHeight: 40, // ぷよぷよ画像の高さ

    stageBackgroundColor: "#ffffff", // ステージの背景色
    scoreBackgroundColor: "#24c0bb", // スコアの背景色

    freeFallingSpeed: 16, // 自由落下のスピード
    eraseMojiCount: 4, // 何個以上揃ったら消えるか
    eraseAnimationDuration: 30, // 何フレームでぷよを消すか

    mojiColors: 4 as MojiColor, // 何色のぷよを使うか
    playerFallingSpeed: 0.9, // プレイ中の自然落下のスピード
    playerDownSpeed: 15, // プレイ中の下キー押下時の落下スピード
    playerGroundFrame: 20, // 何フレーム接地したらぷよを固定するか
    playerMoveFrame: 10, // 左右移動に消費するフレーム数
    playerRotateFrame: 10, // 回転に消費するフレーム数

    zenkeshiAnimationFrame: 9, // 全消し時のアニメーションのフレーム数
    gameOverFrame: 3000, // ゲームオーバー演出のサイクルフレーム
};

// フィールドサイズ追加
// 高さが全部入るように調整
Config.mojiImgHeight =
    (window.innerHeight - Config.fontHeight) / Config.stageRows;
Config.mojiImgWidth = Config.mojiImgHeight;
