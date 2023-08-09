import { useEffect, useState } from 'react';

type Grid = string[][];

const useGame = () => {
    const [positions, setPositions] = useState<Grid>(
        Array.from({ length: 12 }, () => Array.from({ length: 6 }, () => ''))
    );
    // const [generatedMojiCount, setGeneratedMojiCount] = useState<number>(0);

    const checkGameOver = (positions: Grid) => positions.every((row) => row[2] !== '');

    const fallMoji = () => {
        setPositions((pre) => {
            const newState: Grid = Array.from({ length: 12 }, () => Array.from({ length: 6 }, () => ''));
            newState[0] = pre[0];
            for (let i = 11; i >= 1; i--) {
                for (let j = 0; j < 6; j++) {
                    if (pre[i][j] === '') {
                        newState[i][j] = pre[i - 1][j];
                        pre[i - 1][j] = '';
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
            newState[0][2] = [...'アイウエオ'][Math.floor(Math.random() * 5)];
            return newState;
        });
    };

    const checkFallDone = (positions: Grid) => {
        let done = true;
        for (let i = 0; i < 6; i++) {
            if (!done) return false;
            const column = positions.map((row) => row[i]);
            const maxMojiY = column.findIndex((v) => v !== '');
            if (maxMojiY === -1) {
                done = true;
                continue;
            }
            done = column.slice(maxMojiY).every((v) => v !== '');
        }
        return done;
    };

    useEffect(() => {
        if (checkGameOver(positions)) {
            console.log('game over');
            return;
        }
        if (checkFallDone(positions)) {
            const id = setTimeout(() => {
                appearMoji();
            }, 1000);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => fallMoji(), 1000);

        return () => clearTimeout(id);
    }, [positions]);

    return { positions };
};

export default useGame;
