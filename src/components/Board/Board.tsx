import { FC } from 'react';
import { board } from './Board.css';
import Square from './Square';

const Board: FC = () => {
    return (
        <div className={board}>
            {Array.from<number, number>({ length: 6 * 12 }, (i) => i).map((i) => (
                <Square key={i} />
            ))}
        </div>
    );
};

export default Board;
