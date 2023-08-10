import { FC, Fragment } from 'react';
import { board, cell } from './Board.css';
import { Grid } from '../../hooks/useGame';

type Props = {
    grid: Grid;
};

const Board: FC<Props> = ({ grid }) => {
    return (
        <div className={board}>
            {grid.slice(2).map((row, i) => (
                <Fragment key={i}>
                    {row.map((moji, j) => {
                        return moji ? (
                            <div className={cell} key={`${i} ${j}`}>
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
