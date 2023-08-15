import { FC } from 'react';
import { MojiImage } from './MojiImage';
import { MojiOnStage } from '../logic/moji';
import { gameStage, gameStageInner } from './GameStage.css';

export type GameStageProps = {
    mojis: MojiOnStage[];
};

export const GameStage: FC<GameStageProps> = ({ mojis }) => {
    return (
        <div className={gameStage}>
            <div className={gameStageInner}>
                {mojis.map(({ mojiId, ...moji }) => (
                    <MojiImage key={`${mojiId} ${crypto.randomUUID()}`} {...moji} />
                ))}
            </div>
        </div>
    );
};
