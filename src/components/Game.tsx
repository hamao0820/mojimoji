import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { GameStage } from './GameStage';
import { Scoreboard } from './ScoreBoard';
import { MojiMoji } from '../logic/game';
import { Score } from '../logic/score';
import { Stage } from '../logic/stage';
import { Player } from '../logic/player';
import { GameOver } from './GameOver';
import { Zenkeshi } from './Zenkeshi';
import { Config } from '../logic/config';
import Dictionary from './Dictionary';
import { board, game, showHistoryButton, startButton } from './Game.css';
import Next from './Next';
import HistoryDialog from './HistoryDialog';
import { GameStatusBoard } from './GameStatusBoard/GameStatusBoard';

// まずステージを整える
const initialFrame = MojiMoji.initialize();

export const Game: FC = () => {
    const reqIdRef = useRef<number>();
    const [frame, setFrame] = useState(initialFrame); // ゲームの現在フレーム（1/60秒ごとに1追加される）
    const [gameStarted, setGameStarted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const loop = () => {
        reqIdRef.current = requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
        setFrame((prev) => MojiMoji.tick(prev));
    };

    useEffect(() => {
        if (!gameStarted) return;
        // ゲームを開始する
        loop();
        return () => {
            if (reqIdRef.current !== undefined) {
                cancelAnimationFrame(reqIdRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStarted]);

    const open = useCallback((): void => {
        setIsOpen(true);
    }, []);

    const close = useCallback((): void => {
        setIsOpen(false);
    }, []);

    const mojis = [...Stage.getFixedMojis(), ...Stage.getErasingMojis(), ...Player.getPlayingMojis()];
    const batankyuAnimationRatio = MojiMoji.getBatankyuAnimationRatio(frame);
    const zenkeshiAnimationState = Stage.getZenkeshiAnimationState(frame);
    const wordHistory = Player.getWordHistory();
    const { next, wNext } = Player.getNextMojis();
    return (
        <div className={game}>
            <button className={startButton} onClick={() => setGameStarted(true)}>
                スタート
            </button>
            <div style={{ width: Config.mojiImgWidth * Config.stageCols }} className={board}>
                {zenkeshiAnimationState && <Zenkeshi {...zenkeshiAnimationState} />}
                <GameStage mojis={mojis} />
                {batankyuAnimationRatio !== null && <GameOver animationRatio={batankyuAnimationRatio} />}
                <Scoreboard score={Score.score} />
            </div>
            <div>
                <Next centerChar={next.center!.char} movableChar={next.movable!.char} />
                <Next centerChar={wNext.center!.char} movableChar={wNext.movable!.char} />
            </div>
            <button className={showHistoryButton} onClick={open} disabled={MojiMoji.mode !== 'batankyu'}>
                履歴
            </button>
            <GameStatusBoard
                score={Score.score}
                time={0}
                maxCombo={MojiMoji.maxCombo ?? 0}
                wordsCount={wordHistory.length}
            />
            <Dictionary word={wordHistory[wordHistory.length - 1] ?? ''} />
            <HistoryDialog history={wordHistory} isOpen={isOpen} onClose={close} />
        </div>
    );
};
