import { Config } from './config';
import { Stage } from './stage';
import { Score } from './score';
import { Input } from './input';
import { Moji, MojiColor, MojiOnStage } from './moji';

type MojiStatus = {
    x: number; // 中心ぷよの位置: 左から2列目
    y: number; // 画面上部ギリギリから出てくる
    left: number;
    top: number;
    dx: number; // 動くぷよの相対位置: 動くぷよは上方向にある
    dy: number;
    rotation: number; // 動くぷよの角度は90度（上向き）
};

export class Player {
    private static centerMoji: Moji | null;
    private static movableMoji: Moji | null;
    private static mojiStatus: MojiStatus;

    private static groundFrame: number;

    private static actionStartFrame: number;
    private static moveSource: number;
    private static moveDestination: number;
    private static rotateBeforeLeft: number;
    private static rotateAfterLeft: number;
    private static rotateFromRotation: number;

    //ぷよ設置確認
    static createNewMoji() {
        // ぷよぷよが置けるかどうか、1番上の段の左から3つ目を確認する
        if (Stage.board[0][2]) {
            // 空白でない場合は新しいぷよを置けない
            return false;
        }
        // 新しいぷよを作成する
        this.centerMoji = generateMoji();
        this.movableMoji = generateMoji();
        // ぷよの初期配置を定める
        this.mojiStatus = {
            x: 2, // 中心ぷよの位置: 左から2列目
            y: -1, // 画面上部ギリギリから出てくる
            left: 2 * Config.mojiImgWidth,
            top: -1 * Config.mojiImgHeight,
            dx: 0, // 動くぷよの相対位置: 動くぷよは上方向にある
            dy: -1,
            rotation: 90, // 動くぷよの角度は90度（上向き）
        };
        // 接地時間はゼロ
        this.groundFrame = 0;
        return true;
    }

    static getPlayingMojis(): MojiOnStage[] {
        if (!this.centerMoji || !this.movableMoji) {
            return [];
        }

        return [
            {
                ...this.centerMoji,
                position: {
                    left: this.mojiStatus.left,
                    top: this.mojiStatus.top,
                },
            },
            {
                ...this.movableMoji,
                position: {
                    left:
                        this.mojiStatus.left +
                        Math.cos((this.mojiStatus.rotation * Math.PI) / 180) * Config.mojiImgWidth,
                    top:
                        this.mojiStatus.top -
                        Math.sin((this.mojiStatus.rotation * Math.PI) / 180) * Config.mojiImgHeight,
                },
            },
        ];
    }

    private static falling(isDownPressed: boolean) {
        // 現状の場所の下にブロックがあるかどうか確認する
        let isBlocked = false;
        const x = this.mojiStatus.x;
        let y = this.mojiStatus.y;
        const dx = this.mojiStatus.dx;
        const dy = this.mojiStatus.dy;
        if (
            y + 1 >= Config.stageRows ||
            Stage.board[y + 1][x] ||
            (y + dy + 1 >= 0 && (y + dy + 1 >= Config.stageRows || Stage.board[y + dy + 1][x + dx]))
        ) {
            isBlocked = true;
        }
        if (!isBlocked) {
            // 下にブロックがないなら自由落下してよい。プレイヤー操作中の自由落下処理をする
            this.mojiStatus.top += Config.playerFallingSpeed;
            if (isDownPressed) {
                // 下キーが押されているならもっと加速する
                this.mojiStatus.top += Config.playerDownSpeed;
            }
            if (Math.floor(this.mojiStatus.top / Config.mojiImgHeight) != y) {
                // ブロックの境を超えたので、再チェックする
                // 下キーが押されていたら、得点を加算する
                if (isDownPressed) {
                    Score.addDownScore();
                }
                y += 1;
                this.mojiStatus.y = y;
                if (
                    y + 1 >= Config.stageRows ||
                    Stage.board[y + 1][x] ||
                    (y + dy + 1 >= 0 && (y + dy + 1 >= Config.stageRows || Stage.board[y + dy + 1][x + dx]))
                ) {
                    isBlocked = true;
                }
                if (!isBlocked) {
                    // 境を超えたが特に問題はなかった。次回も自由落下を続ける
                    this.groundFrame = 0;
                    return;
                } else {
                    // 境を超えたらブロックにぶつかった。位置を調節して、接地を開始する
                    this.mojiStatus.top = y * Config.mojiImgHeight;
                    this.groundFrame = 1;
                    return;
                }
            } else {
                // 自由落下で特に問題がなかった。次回も自由落下を続ける
                this.groundFrame = 0;
                return;
            }
        }
        if (this.groundFrame == 0) {
            // 初接地である。接地を開始する
            this.groundFrame = 1;
            return;
        } else {
            this.groundFrame++;
            if (this.groundFrame > Config.playerGroundFrame) {
                return true;
            }
        }
    }

    static playing(frame: number) {
        // まず自由落下を確認する
        // 下キーが押されていた場合、それ込みで自由落下させる
        if (this.falling(Input.keyStatus.down)) {
            // 落下が終わっていたら、ぷよを固定する
            return 'fix';
        }
        if (Input.keyStatus.right || Input.keyStatus.left) {
            // 左右の確認をする
            const cx = Input.keyStatus.right ? 1 : -1;
            const x = this.mojiStatus.x;
            const y = this.mojiStatus.y;
            const mx = x + this.mojiStatus.dx;
            const my = y + this.mojiStatus.dy;
            // その方向にブロックがないことを確認する
            // まずは自分の左右を確認
            let canMove = true;
            if (y < 0 || x + cx < 0 || x + cx >= Config.stageCols || Stage.board[y][x + cx]) {
                if (y >= 0) {
                    canMove = false;
                }
            }
            if (my < 0 || mx + cx < 0 || mx + cx >= Config.stageCols || Stage.board[my][mx + cx]) {
                if (my >= 0) {
                    canMove = false;
                }
            }
            // 接地していない場合は、さらに1個下のブロックの左右も確認する
            if (this.groundFrame === 0) {
                if (y + 1 < 0 || x + cx < 0 || x + cx >= Config.stageCols || Stage.board[y + 1][x + cx]) {
                    if (y + 1 >= 0) {
                        canMove = false;
                    }
                }
                if (my + 1 < 0 || mx + cx < 0 || mx + cx >= Config.stageCols || Stage.board[my + 1][mx + cx]) {
                    if (my + 1 >= 0) {
                        canMove = false;
                    }
                }
            }

            if (canMove) {
                // 動かすことが出来るので、移動先情報をセットして移動状態にする
                this.actionStartFrame = frame;
                this.moveSource = x * Config.mojiImgWidth;
                this.moveDestination = (x + cx) * Config.mojiImgWidth;
                this.mojiStatus.x += cx;
                return 'moving';
            }
        } else if (Input.keyStatus.up) {
            // 回転を確認する
            // 回せるかどうかは後で確認。まわすぞ
            const x = this.mojiStatus.x;
            const y = this.mojiStatus.y;
            const rotation = this.mojiStatus.rotation;
            let canRotate = true;

            let cx = 0;
            let cy = 0;
            if (rotation === 0) {
                // 右から上には100% 確実に回せる。何もしない
            } else if (rotation === 90) {
                // 上から左に回すときに、左にブロックがあれば右に移動する必要があるのでまず確認する
                if (
                    y + 1 < 0 ||
                    x - 1 < 0 ||
                    y + 1 >= Config.stageRows ||
                    x - 1 >= Config.stageCols ||
                    Stage.board[y + 1][x - 1]
                ) {
                    if (y + 1 >= 0) {
                        // ブロックがある。右に1個ずれる
                        cx = 1;
                    }
                }
                // 右にずれる必要がある時、右にもブロックがあれば回転出来ないので確認する
                if (cx === 1) {
                    if (
                        y + 1 < 0 ||
                        x + 1 < 0 ||
                        y + 1 >= Config.stageRows ||
                        x + 1 >= Config.stageCols ||
                        Stage.board[y + 1][x + 1]
                    ) {
                        if (y + 1 >= 0) {
                            // ブロックがある。回転出来なかった
                            canRotate = false;
                        }
                    }
                }
            } else if (rotation === 180) {
                // 左から下に回す時には、自分の下か左下にブロックがあれば1個上に引き上げる。まず下を確認する
                if (y + 2 < 0 || y + 2 >= Config.stageRows || Stage.board[y + 2][x]) {
                    if (y + 2 >= 0) {
                        // ブロックがある。上に引き上げる
                        cy = -1;
                    }
                }
                // 左下も確認する
                if (y + 2 < 0 || y + 2 >= Config.stageRows || x - 1 < 0 || Stage.board[y + 2][x - 1]) {
                    if (y + 2 >= 0) {
                        // ブロックがある。上に引き上げる
                        cy = -1;
                    }
                }
            } else if (rotation === 270) {
                // 下から右に回すときは、右にブロックがあれば左に移動する必要があるのでまず確認する
                if (y + 1 < 0 || x + 1 < 0 || x + 1 >= Config.stageCols || Stage.board[y + 1][x + 1]) {
                    if (y + 1 >= 0) {
                        // ブロックがある。左に1個ずれる
                        cx = -1;
                    }
                }
                // 左にずれる必要がある時、左にもブロックがあれば回転出来ないので確認する
                if (cx === -1) {
                    if (y + 1 < 0 || x - 1 < 0 || x - 1 >= Config.stageCols || Stage.board[y + 1][x - 1]) {
                        if (y + 1 >= 0) {
                            // ブロックがある。回転出来なかった
                            canRotate = false;
                        }
                    }
                }
            }

            if (canRotate) {
                // 上に移動する必要があるときは、一気にあげてしまう
                if (cy === -1) {
                    if (this.groundFrame > 0) {
                        // 接地しているなら1段引き上げる
                        this.mojiStatus.y -= 1;
                        this.groundFrame = 0;
                    }
                    this.mojiStatus.top = this.mojiStatus.y * Config.mojiImgHeight;
                }
                // 回すことが出来るので、回転後の情報をセットして回転状態にする
                this.actionStartFrame = frame;
                this.rotateBeforeLeft = x * Config.mojiImgHeight;
                this.rotateAfterLeft = (x + cx) * Config.mojiImgHeight;
                this.rotateFromRotation = this.mojiStatus.rotation;
                // 次の状態を先に設定しておく
                this.mojiStatus.x += cx;
                const distRotation = (this.mojiStatus.rotation + 90) % 360;
                const dComb = [
                    [1, 0],
                    [0, -1],
                    [-1, 0],
                    [0, 1],
                ][distRotation / 90];
                this.mojiStatus.dx = dComb[0];
                this.mojiStatus.dy = dComb[1];
                return 'rotating';
            }
        }
        return 'playing';
    }

    static moving(frame: number) {
        // 移動中も自然落下はさせる
        this.falling(false);
        const ratio = Math.min(1, (frame - this.actionStartFrame) / Config.playerMoveFrame);
        this.mojiStatus.left = ratio * (this.moveDestination - this.moveSource) + this.moveSource;
        if (ratio === 1) {
            return false;
        }
        return true;
    }

    static rotating(frame: number) {
        // 回転中も自然落下はさせる
        this.falling(false);
        const ratio = Math.min(1, (frame - this.actionStartFrame) / Config.playerRotateFrame);
        this.mojiStatus.left = (this.rotateAfterLeft - this.rotateBeforeLeft) * ratio + this.rotateBeforeLeft;
        this.mojiStatus.rotation = this.rotateFromRotation + ratio * 90;
        if (ratio === 1) {
            this.mojiStatus.rotation = (this.rotateFromRotation + 90) % 360;
            return false;
        }
        return true;
    }

    static fix() {
        if (!this.centerMoji || !this.movableMoji) {
            throw new Error('centerMoji or movableMoji is null');
        }
        // 現在のぷよをステージ上に配置する
        const x = this.mojiStatus.x;
        const y = this.mojiStatus.y;
        const dx = this.mojiStatus.dx;
        const dy = this.mojiStatus.dy;
        if (y >= 0) {
            // 画面外のぷよは消してしまう
            Stage.setMoji(x, y, this.centerMoji.color, this.centerMoji.mojiId);
        }
        if (y + dy >= 0) {
            // 画面外のぷよは消してしまう
            Stage.setMoji(x + dx, y + dy, this.movableMoji.color, this.movableMoji.mojiId);
        }
        // 操作用に作成したぷよ画像を消す
        this.centerMoji = null;
        this.movableMoji = null;
    }

    static batankyu() {
        if (Input.keyStatus.up) {
            location.reload();
        }
    }
}

function generateMoji(): Moji {
    return {
        mojiId: generateMojiId(),
        color: randomMojiColor(),
    };
}

let lastMojiId = 0;
function generateMojiId(): number {
    return ++lastMojiId;
}

function randomMojiColor(): MojiColor {
    // 新しいぷよの色を決める
    const mojiColors = Math.max(1, Math.min(5, Config.mojiColors));
    return (Math.floor(Math.random() * mojiColors) + 1) as MojiColor;
}
