export const Config = {
    stageCols: 6, // ステージの横の個数
    stageRows: 12, // ステージの縦の個数

    readyFrame: 120, // 何フレームで開始するか

    freeFallingSpeed: 0.3, // 自由落下のスピード
    eraseMojiCount: 4, // 何個以上揃ったら消えるか
    eraseAnimationDuration: 60, // 何フレームでぷよを消すか

    playerFallingSpeed: 0.015, // プレイ中の自然落下のスピード
    playerDownSpeed: 0.25, // プレイ中の下キー押下時の落下スピード
    playerGroundFrame: 20, // 何フレーム接地したらぷよを固定するか
    playerMoveFrame: 10, // 左右移動に消費するフレーム数
    playerRotateFrame: 10, // 回転に消費するフレーム数

    zenkeshiAnimationFrame: 9, // 全消し時のアニメーションのフレーム数
    showZenkeshiFrame: 120, // 全消し時のアニメーションのインターバル
};
