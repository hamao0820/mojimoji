import { FC, useEffect, useRef, useState } from 'react';
import { GameStage } from './GameStage';
import { Scoreboard } from './ScoreBoard';
import { initialize, tick, getBatankyuAnimationRatio } from '../logic/game';
import { Score } from '../logic/score';
import { Stage } from '../logic/stage';
import { Player } from '../logic/player';
import { Batankyu } from './Batankyu';
import { Zenkeshi } from './Zenkeshi';
import { Config } from '../logic/config';
import Dictionary from './Dictionary';
import { board, game, startButton } from './Game.css';
import Next from './Next';
import useCountDown from '../hooks/useCountDown';

// まずステージを整える
const initialFrame = initialize();

export const Game: FC = () => {
    const reqIdRef = useRef<number>();
    const [frame, setFrame] = useState(initialFrame); // ゲームの現在フレーム（1/60秒ごとに1追加される）
    const [gameStarted, setGameStarted] = useState(false);
    const [countDownStarted, setCountDownStarted] = useState(false);
    const count = useCountDown(
        3,
        () => {
            setGameStarted(true);
        },
        countDownStarted
    );

    const loop = () => {
        reqIdRef.current = requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
        setFrame(tick);
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

    // console.log(frame)

    const mojis = [...Stage.getFixedMojis(), ...Stage.getErasingMojis(), ...Player.getPlayingMojis()];
    const batankyuAnimationRatio = getBatankyuAnimationRatio(frame);
    const zenkeshiAnimationState = Stage.getZenkeshiAnimationState(frame);
    const erasingWord = Stage.getErasingWord();
    const { next, wNext } = Player.getNextMojis();

    return (
        <div className={game}>
            <button className={startButton} onClick={() => setCountDownStarted(true)}>
                スタート
            </button>
            <div>{count > 0 && count}</div>
            <div style={{ width: Config.mojiImgWidth * Config.stageCols }} className={board}>
                {zenkeshiAnimationState && <Zenkeshi {...zenkeshiAnimationState} />}
                <GameStage mojis={mojis} />
                {batankyuAnimationRatio !== null && <Batankyu animationRatio={batankyuAnimationRatio} />}
                <Scoreboard score={Score.score} />
            </div>
            <div>
                <Next centerChar={next.center!.char} movableChar={next.movable!.char} />
                <Next centerChar={wNext.center!.char} movableChar={wNext.movable!.char} />
            </div>
            <Dictionary word={erasingWord} />
        </div>
    );
};
