import { FC } from 'react';
import Score from './Score';
import Time from './Time';
import MaxComb from './MaxComb';
import WordsCount from './WordsCount';
import { gameStatusBoard } from './GameStatusBoard.css';

type Props = { score: number; time: number; maxCombo: number; wordsCount: number };

export const GameStatusBoard: FC<Props> = ({ score, time, maxCombo, wordsCount }) => {
    return (
        <div className={gameStatusBoard}>
            <Score score={score} />
            <Time time={time} />
            <MaxComb maxCombo={maxCombo} />
            <WordsCount wordsCount={wordsCount} />
        </div>
    );
};
