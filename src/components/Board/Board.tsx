import { FC } from 'react';
import { board } from './Board.css';
import Square from './Square';
import { Grid } from '../../hooks/useGame';

type Props = {
    positions: Grid;
};

const Board: FC<Props> = ({ positions }) => {
    return (
        <div className={board}>
            {positions
                .slice(1)
                .flat()
                .map((s, i) =>
                    s.filled ? <Square moji={s.moji?.char ?? ''} key={i} /> : <Square moji={''} key={i} />
                )}
        </div>
    );
};

export default Board;
