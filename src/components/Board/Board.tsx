import { FC } from 'react';
import { board } from './Board.css';
import Square from './Square';
import { Grid } from '../../hooks/useGame';

type Props = {
    grid: Grid;
};

const Board: FC<Props> = ({ grid }) => {
    return (
        <div className={board}>
            {grid
                .slice(1)
                .flat()
                .map((s, i) => (s ? <Square moji={s.char} key={i} /> : <Square moji={''} key={i} />))}
        </div>
    );
};

export default Board;
