import { Stage } from './stage';
import { Player } from './player';
import { Score } from './score';
import { Input } from './input';
import { Config } from './config';

type GameMode =
    | 'start'
    | 'checkFall'
    | 'fall'
    | 'checkErase'
    | 'erasing'
    | 'newMoji'
    | 'playing'
    | 'moving'
    | 'rotating'
    | 'fix'
    | 'gameOver'
    | 'batankyu';

class MojiMoji {
    static mode: GameMode | null; // ゲームの現在の状況
    private static comboCount: number | null; // 何連鎖かどうか
    static maxCombo: number | null; // 最大連鎖数:
    private static gameOverFrame: number | null; // ゲームオーバーになったフレーム
    static initialize(): number {
        // ステージを準備する
        Stage.initialize();
        // ユーザー操作の準備をする
        Input.initialize();
        // スコア表示の準備をする
        Score.initialize();
        // プレイヤーの準備をする
        Player.initialize();

        this.mode = 'start';
        this.comboCount = 0;
        this.maxCombo = 0;
        this.gameOverFrame = null;

        return 0;
    }

    static tick(frame: number): number {
        switch (this.mode) {
            case 'start': {
                // 最初は、もしかしたら空中にあるかもしれないもじを自由落下させるところからスタート
                this.mode = 'checkFall';
                break;
            }
            case 'checkFall': {
                // 落ちるかどうか判定する
                if (Stage.checkFall()) {
                    this.mode = 'fall';
                } else {
                    // 落ちないならば、もじを消せるかどうか判定する
                    this.mode = 'checkErase';
                }
                break;
            }
            case 'fall': {
                if (!Stage.fall()) {
                    // すべて落ちきったら、もじを消せるかどうか判定する
                    this.mode = 'checkErase';
                }
                break;
            }
            case 'checkErase': {
                // 消せるかどうか判定する
                const eraseInfo = Stage.checkErase(frame);
                if (this.comboCount === null) this.comboCount = 0;
                if (eraseInfo) {
                    this.mode = 'erasing';
                    this.comboCount++;
                    // 得点を計算する
                    Score.addErasingScore(this.comboCount, eraseInfo.piece, eraseInfo.longestWordLength);
                    Stage.hideZenkeshi(frame);
                    Player.addWordHistory(...eraseInfo.wordList);
                } else {
                    if (Stage.getFixedMojis().length === 0 && this.comboCount > 0) {
                        // 全消しの処理をする
                        Stage.showZenkeshi(frame);
                        Score.addZenkeshiScore();
                    }
                    if (this.maxCombo === null) this.maxCombo = 0;
                    this.maxCombo = Math.max(this.maxCombo, this.comboCount);
                    this.comboCount = 0;
                    // 消せなかったら、新しいもじを登場させる
                    this.mode = 'newMoji';
                }
                break;
            }
            case 'erasing': {
                if (!Stage.erasing(frame)) {
                    // 消し終わったら、再度落ちるかどうか判定する
                    this.mode = 'checkFall';
                }
                break;
            }
            case 'newMoji': {
                if (!Player.createNewMoji()) {
                    // 新しい操作用もじを作成出来なかったら、ゲームオーバー
                    this.mode = 'gameOver';
                } else {
                    // プレイヤーが操作可能
                    this.mode = 'playing';
                }
                break;
            }
            case 'playing': {
                // プレイヤーが操作する
                const action = Player.playing(frame);
                this.mode = action; // 'playing' 'moving' 'rotating' 'fix' のどれかが帰ってくる
                break;
            }
            case 'moving': {
                if (!Player.moving(frame)) {
                    // 移動が終わったので操作可能にする
                    this.mode = 'playing';
                }
                break;
            }
            case 'rotating': {
                if (!Player.rotating(frame)) {
                    // 回転が終わったので操作可能にする
                    this.mode = 'playing';
                }
                break;
            }
            case 'fix': {
                // 現在の位置でもじを固定する
                Player.fix();
                // 固定したら、まず自由落下を確認する
                this.mode = 'checkFall';
                break;
            }
            case 'gameOver': {
                // ばたんきゅーの準備をする
                this.gameOverFrame = frame;
                this.mode = 'batankyu';
                break;
            }
            case 'batankyu': {
                break;
            }
        }

        return frame + 1;
    }

    static getBatankyuAnimationRatio(frame: number): number | null {
        if (this.mode !== 'batankyu') {
            return null;
        }
        if (this.gameOverFrame === null) return 1;

        return (frame - this.gameOverFrame) / Config.gameOverFrame;
    }
}

export { MojiMoji };
