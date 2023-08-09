import { useEffect, useState } from 'react';

type Row = string[];
type Grid = Row[];

const useGame = () => {
    const [positions, setPositions] = useState<Grid>(
        Array.from({ length: 12 }, () => Array.from({ length: 6 }, () => ''))
    );
    useEffect(() => {
        const timeId = setInterval(() => {
            setPositions((pre) => {
                const newState: Grid = Array.from({ length: 12 }, () => Array.from({ length: 6 }, () => ''));
                if (pre.every((row) => row[2] !== '')) {
                    clearInterval(timeId);
                    alert('game over');
                    return pre;
                }
                newState[0] = pre[0];
                for (let i = 11; i >= 0; i--) {
                    for (let j = 0; j < 6; j++) {
                        if (i != 0) {
                            if (pre[i][j] === '') {
                                newState[i][j] = pre[i - 1][j];
                                pre[i - 1][j] = '';
                            }
                        }
                    }
                }
                newState[0][2] = [...'アイウエオ'][Math.floor(Math.random() * 5)];
                return newState;
            });
        }, 1500);
        () => clearInterval(timeId);
    }, []);
    return { positions };
};

export default useGame;
