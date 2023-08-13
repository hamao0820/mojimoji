import { FC } from 'react';
import { gameStatusElement, gameStatusElementTitle, gameStatusElementValue } from './GameStatusBoard.css';

type Props = { score: number };

const Score: FC<Props> = ({ score }) => {
    return (
        <div className={gameStatusElement}>
            <div className={gameStatusElementTitle}>スコア:</div>
            <div className={gameStatusElementValue}>{score}</div>
        </div>
    );
};

export default Score;
