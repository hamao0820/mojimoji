import { useEffect, useState } from 'react';

export type Position = { x: 0 | 1 | 2 | 3 | 4 | 5 | 6; y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 };
export type Moji = { position: Position; char: string };
export type Square = { position: Position; filled: boolean; moji?: Moji };
export type Grid = Square[][];

const timeout = 1000;

const useGame = () => {
    const [positions, setPositions] = useState<Grid>(
        Array.from({ length: 13 }, (_, y) =>
            Array.from({ length: 6 }, (_, x) => {
                return { position: { y, x } as Position, filled: false };
            })
        )
    );

    const checkGameOver = (positions: Grid) => positions.every((row) => row[2].moji);

    const fallMoji = () => {
        setPositions((pre) => {
            const newState: Grid = Array.from({ length: 13 }, (_, y) =>
                Array.from({ length: 6 }, (_, x) => {
                    return { position: { y, x } as Position, filled: false };
                })
            );
            newState[0] = pre[0];
            newState[1] = pre[1];
            for (let i = 12; i >= 1; i--) {
                for (let j = 0; j < 6; j++) {
                    if (!pre[i][j].moji) {
                        newState[i][j] = pre[i - 1][j];
                        pre[i - 1][j] = { position: { y: i - 1, x: j }, filled: false } as Square;
                    } else {
                        newState[i][j] = pre[i][j];
                    }
                }
            }
            return newState;
        });
    };

    const appearMoji = () => {
        setPositions((pre) => {
            const newState = structuredClone(pre);
            newState[0][2] = {
                position: { y: 0, x: 2 },
                filled: true,
                moji: { position: { y: 0, x: 2 }, char: [...'アイウエオ'][Math.floor(Math.random() * 5)] },
            };
            if (!pre[1][2].moji)
                newState[1][2] = {
                    position: { y: 1, x: 2 },
                    filled: true,
                    moji: { position: { y: 1, x: 2 }, char: [...'アイウエオ'][Math.floor(Math.random() * 5)] },
                };
            return newState;
        });
    };

    const checkFallDone = (positions: Grid) => {
        let done = true;
        for (let i = 0; i < 6; i++) {
            if (!done) return false;
            const column = positions.map((row) => row[i]);
            const maxMojiY = column.findIndex((v) => v.filled);
            if (maxMojiY === -1) {
                done = true;
                continue;
            }
            done = column.slice(maxMojiY).every((v) => v.filled);
        }
        return done;
    };

    useEffect(() => {
        if (checkGameOver(positions)) {
            console.log('game over');
            return;
        }

        if (checkFallDone(positions)) {
            const id = setTimeout(() => appearMoji(), timeout);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => fallMoji(), timeout);

        return () => clearTimeout(id);
    }, [positions]);

    return { positions };
};

export default useGame;
