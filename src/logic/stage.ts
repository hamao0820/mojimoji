import { Config } from './config';
import { MojiOnStage, MojiColor, MojiPosition } from './moji';

type FallingMoji = {
    position: MojiPosition;
    destinationTop: number;
    falling: boolean;
};

type MojiInfo = {
    x: number;
    y: number;
    moji: MojiOnStage;
};

type ZenkeshiAnimationState = {
    showRatio: number;
    hideRatio: number;
};

export class Stage {
    static board: (null | MojiOnStage)[][];
    private static fallingMojiList: FallingMoji[];
    private static eraseStartFrame: number;
    private static erasingMojiInfoList: MojiOnStage[];
    private static erasingMojiIsHidden: boolean;
    private static zenkeshiShowStartFrame: number | null;
    private static zenkeshiHideStartFrame: number | null;

    static initialize() {
        // メモリを準備する
        this.board = [];
        for (let y = 0; y < Config.stageRows; y++) {
            this.board[y] = [];
            for (let x = 0; x < Config.stageCols; x++) {
                this.board[y][x] = null;
            }
        }
        this.fallingMojiList = [];
        this.erasingMojiInfoList = [];
        this.zenkeshiShowStartFrame = null;
        this.zenkeshiHideStartFrame = null;
    }

    static getFixedMojis(): MojiOnStage[] {
        return this.board.flat().filter((cell) => cell !== null) as MojiOnStage[];
    }

    static getErasingMojis(): MojiOnStage[] {
        return this.erasingMojiInfoList.map((moji) => ({
            ...moji,
            hidden: this.erasingMojiIsHidden,
        }));
    }

    static getZenkeshiAnimationState(frame: number): ZenkeshiAnimationState | null {
        if (!this.zenkeshiShowStartFrame) {
            return null;
        }
        const showRatio = Math.min((frame - this.zenkeshiShowStartFrame) / Config.zenkeshiAnimationFrame, 1);
        const hideRatio =
            this.zenkeshiHideStartFrame !== null
                ? Math.min((frame - this.zenkeshiHideStartFrame) / Config.zenkeshiAnimationFrame, 1)
                : 0;

        if (hideRatio === 1) {
            return null;
        }

        return { showRatio, hideRatio };
    }

    // メモリに moji をセットする
    static setMoji(x: number, y: number, moji: MojiColor, mojiId: number) {
        // メモリにセットする
        this.board[y][x] = {
            mojiId,
            color: moji,
            position: {
                left: x * Config.mojiImgWidth,
                top: y * Config.mojiImgHeight,
            },
        };
    }

    // 自由落下をチェックする
    static checkFall() {
        this.fallingMojiList.length = 0;
        let isFalling = false;
        // 下の行から上の行を見ていく
        for (let y = Config.stageRows - 2; y >= 0; y--) {
            const line = this.board[y];
            for (let x = 0; x < line.length; x++) {
                const cell = this.board[y][x];
                if (!cell) {
                    // このマスにぷよがなければ次
                    continue;
                }
                if (!this.board[y + 1][x]) {
                    // このぷよは落ちるので、取り除く
                    this.board[y][x] = null;
                    let dst = y;
                    while (dst + 1 < Config.stageRows && this.board[dst + 1][x] == null) {
                        dst++;
                    }
                    // 最終目的地に置く
                    this.board[dst][x] = cell;
                    // 落ちるリストに入れる
                    this.fallingMojiList.push({
                        position: cell.position,
                        destinationTop: dst * Config.mojiImgHeight,
                        falling: true,
                    });
                    // 落ちるものがあったことを記録しておく
                    isFalling = true;
                }
            }
        }
        return isFalling;
    }
    // 自由落下させる
    static fall() {
        let isFalling = false;
        for (const fallingMoji of this.fallingMojiList) {
            if (!fallingMoji.falling) {
                // すでに自由落下が終わっている
                continue;
            }
            let top = fallingMoji.position.top;
            top += Config.freeFallingSpeed;
            if (top >= fallingMoji.destinationTop) {
                // 自由落下終了
                top = fallingMoji.destinationTop;
                fallingMoji.falling = false;
            } else {
                // まだ落下しているぷよがあることを記録する
                isFalling = true;
            }
            // ぷよを動かす
            fallingMoji.position.top = top;
        }
        return isFalling;
    }

    // 消せるかどうか判定する
    static checkErase(startFrame: number) {
        this.eraseStartFrame = startFrame;
        this.erasingMojiInfoList.length = 0;

        // 何色のぷよを消したかを記録する
        const erasedMojiColor: Partial<Record<MojiColor, boolean>> = {};

        // 隣接ぷよを確認する関数内関数を作成
        const sequenceMojiInfoList: MojiInfo[] = [];
        const existingMojiInfoList: MojiInfo[] = [];
        const checkSequentialMoji = (x: number, y: number) => {
            // ぷよがあるか確認する
            const origMoji = this.board[y][x];
            if (!origMoji) {
                // ないなら何もしない
                return;
            }
            // あるなら一旦退避して、メモリ上から消す
            sequenceMojiInfoList.push({
                x: x,
                y: y,
                moji: origMoji,
            });
            this.board[y][x] = null;

            // 四方向の周囲ぷよを確認する
            const direction = [
                [0, 1],
                [1, 0],
                [0, -1],
                [-1, 0],
            ];
            for (let i = 0; i < direction.length; i++) {
                const dx = x + direction[i][0];
                const dy = y + direction[i][1];
                if (dx < 0 || dy < 0 || dx >= Config.stageCols || dy >= Config.stageRows) {
                    // ステージの外にはみ出た
                    continue;
                }
                const cell = this.board[dy][dx];
                if (!cell || cell.color !== origMoji.color) {
                    // ぷよの色が違う
                    continue;
                }
                // そのぷよのまわりのぷよも消せるか確認する
                checkSequentialMoji(dx, dy);
            }
        };

        // 実際に削除できるかの確認を行う
        for (let y = 0; y < Config.stageRows; y++) {
            for (let x = 0; x < Config.stageCols; x++) {
                sequenceMojiInfoList.length = 0;
                const mojiColor = this.board[y][x]?.color;
                checkSequentialMoji(x, y);
                if (sequenceMojiInfoList.length == 0 || sequenceMojiInfoList.length < Config.eraseMojiCount) {
                    // 連続して並んでいる数が足りなかったので消さない
                    if (sequenceMojiInfoList.length) {
                        // 退避していたぷよを消さないリストに追加する
                        existingMojiInfoList.push(...sequenceMojiInfoList);
                    }
                } else {
                    if (!mojiColor) {
                        throw new Error('mojiColor must be truthy');
                    }
                    // これらは消して良いので消すリストに追加する
                    this.erasingMojiInfoList.push(...sequenceMojiInfoList.map((info) => info.moji));
                    erasedMojiColor[mojiColor] = true;
                }
            }
        }

        // 消さないリストに入っていたぷよをメモリに復帰させる
        for (const info of existingMojiInfoList) {
            this.board[info.y][info.x] = info.moji;
        }

        if (this.erasingMojiInfoList.length) {
            // もし消せるならば、消えるぷよの個数と色の情報をまとめて返す
            return {
                piece: this.erasingMojiInfoList.length,
                color: Object.keys(erasedMojiColor).length,
            };
        }
        return null;
    }

    // 消すアニメーションをする
    static erasing(frame: number) {
        const elapsedFrame = frame - this.eraseStartFrame;
        const ratio = elapsedFrame / Config.eraseAnimationDuration;
        if (ratio > 1) {
            // アニメーションを終了する
            this.erasingMojiInfoList = [];
            return false;
        } else if (ratio > 0.75) {
            this.erasingMojiIsHidden = false;
            return true;
        } else if (ratio > 0.5) {
            this.erasingMojiIsHidden = true;
            return true;
        } else if (ratio > 0.25) {
            this.erasingMojiIsHidden = false;
            return true;
        } else {
            this.erasingMojiIsHidden = true;
            return true;
        }
    }

    static showZenkeshi(frame: number) {
        // 全消しを表示する
        this.zenkeshiShowStartFrame = frame;
        this.zenkeshiHideStartFrame = null;
    }

    static hideZenkeshi(frame: number) {
        // 全消しを消去する
        this.zenkeshiHideStartFrame = frame;
    }
}
