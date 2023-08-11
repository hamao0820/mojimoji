import data from '../../public/top11.json';
import { Config } from '../logic/config';
import { MojiOnStage } from '../logic/moji';

type Position = { x: number; y: number };
const checkPositionList: Position[][] = [];

for (let y = 0; y < Config.stageRows; y++) {
    for (let x = 0; x < Config.stageCols; x++) {
        if (x <= 3) {
            checkPositionList.push([
                { x: x, y: y },
                { x: x + 1, y: y },
                { x: x + 2, y: y },
            ]);
        }
        if (x <= 2) {
            checkPositionList.push([
                { x: x, y: y },
                { x: x + 1, y: y },
                { x: x + 2, y: y },
                { x: x + 3, y: y },
            ]);
        }
        if (x <= 1) {
            checkPositionList.push([
                { x: x, y: y },
                { x: x + 1, y: y },
                { x: x + 2, y: y },
                { x: x + 3, y: y },
                { x: x + 4, y: y },
            ]);
        }
        if (x === 0) {
            checkPositionList.push([
                { x: x, y: y },
                { x: x + 1, y: y },
                { x: x + 2, y: y },
                { x: x + 3, y: y },
                { x: x + 4, y: y },
                { x: x + 5, y: y },
            ]);
        }
        if (y <= 9) {
            checkPositionList.push([
                { x: x, y: y },
                { x: x, y: y + 1 },
                { x: x, y: y + 2 },
            ]);
        }
        if (y <= 8) {
            checkPositionList.push([
                { x: x, y: y },
                { x: x, y: y + 1 },
                { x: x, y: y + 2 },
                { x: x, y: y + 3 },
            ]);
        }
        if (y <= 7) {
            checkPositionList.push([
                { x: x, y: y },
                { x: x, y: y + 1 },
                { x: x, y: y + 2 },
                { x: x, y: y + 3 },
                { x: x, y: y + 4 },
            ]);
        }
        if (y <= 6) {
            checkPositionList.push([
                { x: x, y: y },
                { x: x, y: y + 1 },
                { x: x, y: y + 2 },
                { x: x, y: y + 3 },
                { x: x, y: y + 4 },
                { x: x, y: y + 5 },
            ]);
        }
    }
}

const correctWords = data.data;

export const getLineJoinedWord = (board: (null | MojiOnStage)[][], line: Position[]): string => {
    let word = '';
    for (const pos of line) {
        const moji = board[pos.y][pos.x];
        if (!moji) return '';
        word += moji.char;
    }
    return word;
};

export const getAllJoinedWordsAndLine = (board: (null | MojiOnStage)[][]): [string, Position[]][] =>
    checkPositionList
        .map<[string, Position[]]>((line) => [getLineJoinedWord(board, line), line])
        .filter(([word]) => word !== '');

export const getCorrectWordsAndLines = (board: (null | MojiOnStage)[][]): [string, Position[]][] =>
    getAllJoinedWordsAndLine(board).filter(([word]) => correctWords.includes(word));
