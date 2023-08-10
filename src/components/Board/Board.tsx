import { FC, Fragment } from 'react';
import { board, cell } from './Board.css';
import { Moji } from '../../hooks/useMojiList';
import useGame from '../../hooks/useGame';

type Props = {
    MojiList: Moji[];
};

const Board: FC<Props> = () => {
    const { grid } = useGame();
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
