import { useCallback, useEffect } from 'react';
import useMojiList, { Moji } from './useMojiList';

export type Position = { x: 0 | 1 | 2 | 3 | 4 | 5; y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 };
export type Grid = (Moji | null)[][];

const interval = 300;

const grid: Grid = Array.from({ length: 13 }, () => Array.from({ length: 6 }, () => null));
const checkGameOver = (grid: Grid) => grid.every((row) => row[2] !== null);

const checkFallDone = (grid: Grid) => {
    let done = true;
    for (let i = 0; i < 6; i++) {
        if (!done) return false;
        const column = grid.map((row) => row[i]);
        const maxMojiY = column.findIndex((v) => v !== null);
        if (maxMojiY === -1) {
            done = true;
            continue;
        }
        done = column.slice(maxMojiY + 1).every((v) => v !== null);
    }
    return done;
};

const useGame = () => {
    const { mojiList, dispatch } = useMojiList();

    const appearMoji = useCallback(() => {
        dispatch({
            type: 'add',
            payload: {
                position: { y: 0, x: 2 },
                char: [...'アイウエオ'][Math.floor(Math.random() * 5)],
            },
        });
        dispatch({
            type: 'add',
            payload: {
                position: { y: 1, x: 2 },
                char: [...'アイウエオ'][Math.floor(Math.random() * 5)],
            },
        });
    }, [dispatch]);

    const handleLR = useCallback(
        (e: KeyboardEvent) => {
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
        [dispatch]
    );

    useEffect(() => {
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 6; j++) {
                grid[i][j] = null;
            }
        }
        for (const moji of mojiList) {
            grid[moji.position.y][moji.position.x] = moji;
        }
    }, [mojiList]);

    useEffect(() => {
        const id = setInterval(() => {
            if (checkGameOver(grid)) {
                console.log('game over');
                clearInterval(id);
                return;
            }
            dispatch({ type: 'fall' });
            if (checkFallDone(grid)) {
                dispatch({ type: 'fix' });
                appearMoji();
            }
        }, interval);

        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleLR);
        return () => document.removeEventListener('keydown', handleLR);
    }, [handleLR]);

    return { grid };
};

export default useGame;
