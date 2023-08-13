import { FC } from 'react';
import { gameStatusElement, gameStatusElementTitle, gameStatusElementValue } from './GameStatusBoard.css';

type Props = { wordsCount: number };

const WordsCount: FC<Props> = ({ wordsCount }) => {
    return (
        <div className={gameStatusElement}>
            <div className={gameStatusElementTitle}>単語数:</div>
            <div className={gameStatusElementValue}>{wordsCount}</div>
        </div>
    );
};

export default WordsCount;
