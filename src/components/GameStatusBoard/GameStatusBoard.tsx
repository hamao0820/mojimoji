import { FC } from 'react';
import { gameStatusBoard } from './GameStatusBoard.css';
import GameStatus from './GameStatus';

type Props = { score: number; level: number; maxCombo: number; wordsCount: number; zenkeshiCount: number };

export const GameStatusBoard: FC<Props> = ({ score, level, maxCombo, wordsCount, zenkeshiCount }) => {
    return (
        <div className={gameStatusBoard}>
            <GameStatus title="レベル" value={level} />
            <GameStatus title="単語数" value={wordsCount} />
            <GameStatus title="全消し回数" value={zenkeshiCount} />
            <GameStatus title="最大コンボ" value={maxCombo} />
            <GameStatus title="スコア" value={score} />
        </div>
    );
};
