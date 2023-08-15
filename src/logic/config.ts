export const Config = {
    stageCols: 6, // ステージの横の個数
    stageRows: 12, // ステージの縦の個数

    // TODO: 削除
    mojiImgWidth: 62, // ぷよぷよ画像の幅
    mojiImgHeight: 62, // ぷよぷよ画像の高さ
    fontHeight: 33, // フォントの高さ

    readyFrame: 120, // 何フレームで開始するか

    freeFallingSpeed: 16, // 自由落下のスピード
    eraseMojiCount: 4, // 何個以上揃ったら消えるか
    eraseAnimationDuration: 60, // 何フレームでぷよを消すか

    mojiChars: 9, // 何色のぷよを使うか
    playerFallingSpeed: 0.9, // プレイ中の自然落下のスピード
    playerDownSpeed: 15, // プレイ中の下キー押下時の落下スピード
    playerGroundFrame: 20, // 何フレーム接地したらぷよを固定するか
    playerMoveFrame: 10, // 左右移動に消費するフレーム数
    playerRotateFrame: 10, // 回転に消費するフレーム数

    zenkeshiAnimationFrame: 9, // 全消し時のアニメーションのフレーム数
    showZenkeshiFrame: 120, // 全消し時のアニメーションのインターバル
};
