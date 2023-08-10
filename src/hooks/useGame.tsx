import { useCallback, useEffect, useState } from 'react';
import useMojiList, { Moji } from './useMojiList';

export type Position = {
    x: 0 | 1 | 2 | 3 | 4 | 5;
    y:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23
        | 24
        | 25;
};
export type Grid = (Moji | null)[][];

const interval = 500;

const checkGameOver = (grid: Grid) => grid.every((row, i) => i % 2 === 0 || row[2] !== null);

const checkAllMojiHaveFallen = (grid: Grid): boolean => {
    let done = true;
    for (let i = 0; i < 6; i++) {
        if (!done) return false;
        const column = grid.map((row) => row[i]);
        if (column.some((moji) => moji && moji.position.y % 2 === 0)) return false;
        const maxMojiY = column.findIndex((v) => v !== null);
        if (maxMojiY === -1) {
            done = true;
            continue;
        }
        done = column.slice(maxMojiY + 2).every((v, i) => i % 2 === maxMojiY % 2 || v !== null);
    }
    return done;
};

const checkControllable = (grid: Grid): boolean => {
    const controllablePositions: Position[] = [];
    grid.forEach((row, i) =>
        row.forEach((moji, j) => {
            if (!moji) return;
            if (moji.controllable) controllablePositions.push({ y: i, x: j } as Position);
        })
    );
    if (controllablePositions.length === 0) return false;
    for (const position of controllablePositions) {
        if (position.y === 25) return false;
        if (position.y === 24) continue;
        const moji = grid[position.y + 2][position.x];
        if (!moji) continue;
        if (!moji.controllable) return false;
    }
    return true;
};

const useGame = () => {
    const { mojiList, dispatch } = useMojiList();
    const [initialTime] = useState(Date.now());
    const [grid, setGrid] = useState<Grid>(Array.from({ length: 26 }, () => Array.from({ length: 6 }, () => null)));

    const appearMoji = useCallback(() => {
        dispatch({
            type: 'add',
            payload: {
                position: { y: 1, x: 2 },
                char: [...'アイウエオ'][Math.floor(Math.random() * 5)],
                axis: false,
                id: crypto.randomUUID(),
            },
        });
        dispatch({
            type: 'add',
            payload: {
                position: { y: 3, x: 2 },
                char: [...'アイウエオ'][Math.floor(Math.random() * 5)],
                axis: true,
                id: crypto.randomUUID(),
            },
        });
    }, [dispatch]);

    const handleLR = useCallback(
        (e: KeyboardEvent) => {
            if (checkGameOver(grid)) return;
            if (!checkControllable(grid)) return;
            switch (e.key) {
                case 'ArrowRight': {
                    dispatch({ type: 'moveRight' });
                    break;
                }
                case 'ArrowLeft': {
                    dispatch({ type: 'moveLeft' });
                    break;
                }
                default: {
                    break;
                }
            }
        },
        [dispatch, grid]
    );

    const handleDown = useCallback(
        (e: KeyboardEvent) => {
            if (checkGameOver(grid)) return;
            if (!checkControllable(grid)) return;
            if (e.key === 'ArrowDown') {
                dispatch({ type: 'moveDown' });
            }
        },
        [dispatch, grid]
    );

    const handleTurnRight = useCallback(
        (e: KeyboardEvent) => {
            if (checkGameOver(grid)) return;
            if (!checkControllable(grid)) return;
            if (e.repeat) return;
            if (e.key === 'ArrowUp' || e.key === 'x') {
                dispatch({ type: 'turnRight' });
            }
        },
        [dispatch, grid]
    );

    const handleTurnLeft = useCallback(
        (e: KeyboardEvent) => {
            if (checkGameOver(grid)) return;
            if (!checkControllable(grid)) return;
            if (e.repeat) return;
            if (e.key === 'z') {
                dispatch({ type: 'turnLeft' });
            }
        },
        [dispatch, grid]
    );

    useEffect(() => {
        setGrid(() => {
            const newState: (Moji | null)[][] = Array.from({ length: 26 }, () => Array.from({ length: 6 }, () => null));
            for (const moji of mojiList) {
                newState[moji.position.y][moji.position.x] = moji;
            }
            return newState;
        });
    }, [mojiList]);

    useEffect(() => {
        const now = Date.now();
        let nextTime = now + interval - ((now - initialTime) % interval);
        if (checkGameOver(grid)) {
            console.log('game over');
            // dispatch({ type: 'fix' });
            return;
        }
        const loop = () => {
            dispatch({ type: 'fall' });
            if (!checkControllable(grid)) {
                dispatch({ type: 'fix' });
            }
            if (checkAllMojiHaveFallen(grid)) {
                dispatch({ type: 'fix' });
                appearMoji();
            }
            const now = Date.now();
            nextTime = now + interval - ((nextTime - now) % interval);
            const diff = nextTime - now;

            timerId = setTimeout(loop, diff);
        };
        const diff = nextTime - now;
        let timerId = setTimeout(loop, diff);
        return () => {
            clearTimeout(timerId);
        };
    }, [appearMoji, dispatch, grid, initialTime]);

    useEffect(() => {
        document.addEventListener('keydown', handleLR);
        return () => document.removeEventListener('keydown', handleLR);
    }, [handleLR]);

    useEffect(() => {
        document.addEventListener('keydown', handleDown);
        return () => document.removeEventListener('keydown', handleDown);
    }, [handleDown]);

    useEffect(() => {
        document.addEventListener('keydown', handleTurnRight);
        return () => document.removeEventListener('keydown', handleTurnRight);
    }, [handleTurnRight]);

    useEffect(() => {
        document.addEventListener('keydown', handleTurnLeft);
        return () => document.removeEventListener('keydown', handleTurnLeft);
    }, [handleTurnLeft]);
    return { grid, mojiList };
};

export default useGame;
