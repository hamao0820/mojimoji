import { FC } from 'react';
import { gameStatusElement, gameStatusElementTitle, gameStatusElementValue } from './GameStatusBoard.css';

type Props = { maxCombo: number };

const MaxComb: FC<Props> = ({ maxCombo }) => {
    return (
        <div className={gameStatusElement}>
            <div className={gameStatusElementTitle}>最大コンボ:</div>
            <div className={gameStatusElementValue}>{maxCombo}</div>
        </div>
    );
};

export default MaxComb;
