import { FC } from 'react';
import { board } from './Board.css';
import Square from './Square';

type Props = {
    positions: string[][];
};

const Board: FC<Props> = ({ positions }) => {
    return (
        <div className={board}>
            {positions.flat().map((s, i) => (
                <Square moji={s} key={i} />
            ))}
        </div>
    );
};

export default Board;
