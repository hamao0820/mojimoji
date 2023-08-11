import { FC, Fragment } from 'react';
import { board, cell, deletedCell } from './Board.css';
import { Grid } from '../../hooks/useGame';
import { Id } from '../../hooks/useMojiList';

type Props = {
    grid: Grid;
    deletedId: Id[];
};

const Board: FC<Props> = ({ grid, deletedId }) => {
    return (
        <div className={board}>
            {grid.slice(2).map((row, i) => (
                <Fragment key={i}>
                    {row.map((moji, j) => {
                        return moji ? (
                            <div className={deletedId.includes(moji.id) ? deletedCell : cell} key={`${i} ${j}`}>
                                {moji.char}
                            </div>
                        ) : (
                            <div className={cell} key={`${i} ${j}`}></div>
                        );
                    })}
                </Fragment>
            ))}
        </div>
    );
};

export default Board;
