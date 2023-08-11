import React, { useEffect, useRef, useState } from 'react';
import { GameStage } from './GameStage';
import { Scoreboard } from './ScoreBoard';
import { initialize, tick, getBatankyuAnimationRatio } from '../logic/game';
import { Score } from '../logic/score';
import { Stage } from '../logic/stage';
import { Player } from '../logic/player';
import { Batankyu } from './Batankyu';
import { Zenkeshi } from './Zenkeshi';
import { Config } from '../logic/config';

// まずステージを整える
const initialFrame = initialize();

export const Game: React.VFC = () => {
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
    }, []);

    // console.log(frame)

    const mojis = [...Stage.getFixedMojis(), ...Stage.getErasingMojis(), ...Player.getPlayingMojis()];
    const batankyuAnimationRatio = getBatankyuAnimationRatio(frame);
    const zenkeshiAnimationState = Stage.getZenkeshiAnimationState(frame);

    return (
        <div
            style={{
                position: 'relative',
                width: Config.mojiImgWidth * Config.stageCols,
                margin: '0 auto',
                overflow: 'hidden',
                background: 'url(img/moji_2bg.png)',
            }}
        >
            {zenkeshiAnimationState && <Zenkeshi {...zenkeshiAnimationState} />}
            <GameStage mojis={mojis} />
            {batankyuAnimationRatio !== null && <Batankyu animationRatio={batankyuAnimationRatio} />}
            <Scoreboard score={Score.score} />
        </div>
    );
};
