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
import { board, game } from './Game.css';

// まずステージを整える
const initialFrame = initialize();

export const Game: FC = () => {
    const reqIdRef = useRef<number>();
    const [frame, setFrame] = useState(initialFrame); // ゲームの現在フレーム（1/60秒ごとに1追加される）

    const loop = () => {
        reqIdRef.current = requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
        setFrame(tick);
    };

    useEffect(() => {
        // ゲームを開始する
        loop();
        return () => {
            if (reqIdRef.current !== undefined) {
                cancelAnimationFrame(reqIdRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(frame)

    const mojis = [...Stage.getFixedMojis(), ...Stage.getErasingMojis(), ...Player.getPlayingMojis()];
    const batankyuAnimationRatio = getBatankyuAnimationRatio(frame);
    const zenkeshiAnimationState = Stage.getZenkeshiAnimationState(frame);
    const erasingWord = Stage.getErasingWord();

    return (
        <div className={game}>
            <div style={{ width: Config.mojiImgWidth * Config.stageCols }} className={board}>
                {zenkeshiAnimationState && <Zenkeshi {...zenkeshiAnimationState} />}
                <GameStage mojis={mojis} />
                {batankyuAnimationRatio !== null && <Batankyu animationRatio={batankyuAnimationRatio} />}
                <Scoreboard score={Score.score} />
            </div>
            <Dictionary word={erasingWord} />
        </div>
    );
};
