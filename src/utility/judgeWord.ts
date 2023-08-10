import { Grid } from '../hooks/useGame';
import data from '../../public/top11.json';

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

const checkPositionList: Position[][] = [];

for (let i = 0; i <= 5; i++) {
    for (let j = 3; j <= 25; j++) {
        if (j % 2 === 0) continue;
        if (i <= 3) {
            checkPositionList.push([
                { x: i, y: j },
                { x: i + 1, y: j },
                { x: i + 2, y: j },
            ] as Position[]);
        }
        if (i <= 2) {
            checkPositionList.push([
                { x: i, y: j },
                { x: i + 1, y: j },
                { x: i + 2, y: j },
                { x: i + 3, y: j },
            ] as Position[]);
        }
        if (i <= 1) {
            checkPositionList.push([
                { x: i, y: j },
                { x: i + 1, y: j },
                { x: i + 2, y: j },
                { x: i + 3, y: j },
                { x: i + 4, y: j },
            ] as Position[]);
        }
        if (i === 0) {
            checkPositionList.push([
                { x: i, y: j },
                { x: i + 1, y: j },
                { x: i + 2, y: j },
                { x: i + 3, y: j },
                { x: i + 4, y: j },
                { x: i + 5, y: j },
            ] as Position[]);
        }
        if (j <= 21) {
            checkPositionList.push([
                { x: i, y: j },
                { x: i, y: j + 2 },
                { x: i, y: j + 4 },
            ] as Position[]);
        }
        if (j <= 19) {
            checkPositionList.push([
                { x: i, y: j },
                { x: i, y: j + 2 },
                { x: i, y: j + 4 },
                { x: i, y: j + 6 },
            ] as Position[]);
        }
        if (j <= 17) {
            checkPositionList.push([
                { x: i, y: j },
                { x: i, y: j + 2 },
                { x: i, y: j + 4 },
                { x: i, y: j + 6 },
                { x: i, y: j + 8 },
            ] as Position[]);
        }
        if (j <= 15) {
            checkPositionList.push([
                { x: i, y: j },
                { x: i, y: j + 2 },
                { x: i, y: j + 4 },
                { x: i, y: j + 6 },
                { x: i, y: j + 8 },
                { x: i, y: j + 10 },
            ] as Position[]);
        }
    }
}

const correctWords = data.data;

export const getLineJoinedWord = (grid: Grid, line: Position[]): string => {
    let word = '';
    for (const pos of line) {
        const moji = grid[pos.y][pos.x];
        if (!moji) return '';
        word += moji.char;
    }
    return word;
};

export const getAllJoinedWordsAndLine = (grid: Grid): [string, Position[]][] =>
    checkPositionList
        .map<[string, Position[]]>((line) => [getLineJoinedWord(grid, line), line])
        .filter(([word]) => word !== '');

export const getCorrectWordsAndLines = (grid: Grid): [string, Position[]][] =>
    getAllJoinedWordsAndLine(grid).filter(([word]) => correctWords.includes(word));
