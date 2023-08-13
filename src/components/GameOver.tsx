import { FC } from 'react';
import { gameOver } from './GameOver.css';

export const GameOver: FC = () => {
    return <img src="img/game_over.png" className={gameOver} />;
};
