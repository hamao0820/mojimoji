import { FC } from 'react';
import { gameStatusElement, gameStatusElementTitle, gameStatusElementValue } from './GameStatusBoard.css';

type Props = { time: number };

const Time: FC<Props> = ({ time }) => {
    return (
        <div className={gameStatusElement}>
            <div className={gameStatusElementTitle}>タイム:</div>
            <div className={gameStatusElementValue}>{time}</div>
        </div>
    );
};

export default Time;
