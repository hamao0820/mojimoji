import { getCorrectWordsAndLines } from '../utility/judgeWord';
import { Config } from './config';
import { MojiOnStage, MojiChar, MojiPosition } from './moji';

type FallingMoji = {
    position: MojiPosition;
    destinationTop: number;
    falling: boolean;
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
    private static erasingMojiLineList: { x: number; y: number }[][];
    private static erasingMojiLineIdList: number[][];
    private static erasingWordList: string[];
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
        this.erasingMojiLineList = [];
        this.erasingMojiLineIdList = [];
        this.erasingWordList = [];
        this.zenkeshiShowStartFrame = null;
        this.zenkeshiHideStartFrame = null;
    }

    static getFixedMojis(): MojiOnStage[] {
        return this.board.flat().filter((cell) => cell !== null) as MojiOnStage[];
    }

    static getErasingMojis(): MojiOnStage[] {
        return this.erasingMojiInfoList.map((moji) => ({
            ...moji,
            hidden:
                this.erasingMojiLineIdList.length && this.erasingMojiLineIdList[0].includes(moji.mojiId)
                    ? this.erasingMojiIsHidden
                    : false,
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

    static getErasingWord(): string | null {
        if (!this.erasingWordList.length) {
            return null;
        }
        return this.erasingWordList[0];
    }

    // メモリに moji をセットする
    static setMoji(x: number, y: number, char: MojiChar, mojiId: number) {
        // メモリにセットする
        this.board[y][x] = {
            mojiId,
            char: char,
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
                    // このマスにもじがなければ次
                    continue;
                }
                if (!this.board[y + 1][x]) {
                    // このもじは落ちるので、取り除く
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
                // まだ落下しているもじがあることを記録する
                isFalling = true;
            }
            // もじを動かす
            fallingMoji.position.top = top;
        }
        return isFalling;
    }

    // 消せるかどうか判定する
    static checkErase(startFrame: number) {
        this.eraseStartFrame = startFrame;

        const wordsAndLines = getCorrectWordsAndLines(this.board);
        const erasePosList: { x: number; y: number }[] = [];
        for (const [word, line] of wordsAndLines) {
            this.erasingWordList.push(word);
            this.erasingMojiLineList.push(line);
            const lineIdList: number[] = [];
            line.forEach((pos) => {
                const moji = this.board[pos.y][pos.x];
                if (!moji) return;
                this.erasingMojiInfoList.push(moji);
                lineIdList.push(moji.mojiId);
                erasePosList.push(pos);
            });
            this.erasingMojiLineIdList.push(lineIdList);
        }
        erasePosList.forEach((pos) => (this.board[pos.y][pos.x] = null));

        if (this.erasingMojiInfoList.length) {
            // もし消せるならば、消えるもじの個数と文字の長さの情報をまとめて返す
            return {
                piece: this.erasingMojiInfoList.length,
                longestWordLength: this.erasingWordList.reduce((prev, word) => Math.max(prev, word.length), 0),
            };
        }
        return null;
    }

    // 消すアニメーションをする
    static erasing(frame: number) {
        const elapsedFrame = frame - this.eraseStartFrame;
        const ratio = elapsedFrame / Config.eraseAnimationDuration;

        if (!this.erasingMojiLineList.length && !this.erasingMojiLineIdList.length) {
            // アニメーションを終了する
            this.erasingMojiInfoList = [];
            return false;
        }

        if (ratio > 1) {
            this.erasingMojiLineList.shift();
            this.erasingMojiLineIdList.shift();
            this.erasingWordList.shift();
            this.eraseStartFrame = frame;
        } else if (ratio > 0.75) {
            this.erasingMojiIsHidden = false;
        } else if (ratio > 0.5) {
            this.erasingMojiIsHidden = true;
        } else if (ratio > 0.25) {
            this.erasingMojiIsHidden = false;
        } else {
            this.erasingMojiIsHidden = true;
        }

        return true;
    }

    static showZenkeshi(frame: number) {
        // 全消しを表示する
        this.zenkeshiShowStartFrame = frame;
        this.zenkeshiHideStartFrame = null;
    }

    static hideZenkeshi(frame: number) {
        // 全消しを消去する
        this.zenkeshiHideStartFrame = frame;
        this.zenkeshiShowStartFrame = null;
    }
}
