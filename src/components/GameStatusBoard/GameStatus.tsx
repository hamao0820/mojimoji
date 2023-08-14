import { FC } from 'react';
import { gameStatusElement, gameStatusElementTitle, gameStatusElementValue } from './GameStatus.css';

type Props = {
    title: string;
    value: number | string;
};

const GameStatus: FC<Props> = ({ title, value }) => {
    return (
        <div className={gameStatusElement}>
            <div className={gameStatusElementTitle}>{title}: </div>
            <div className={gameStatusElementValue}>{value}</div>
        </div>
    );
};

export default GameStatus;
