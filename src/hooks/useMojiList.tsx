import { Reducer, useReducer } from 'react';
import { Position } from './useGame';

export type Moji = { position: Position; char: string; controllable: boolean };
export type Action =
    | {
          type: 'fall';
      }
    | { type: 'moveDown' }
    | { type: 'moveRight' }
    | { type: 'moveLeft' }
    | { type: 'add'; payload: { position: Position; char: string } }
    | { type: 'delete' }
    | { type: 'fix' };

const canMoveRight = (controllableList: Moji[], MojiList: Moji[]) => {
    return controllableList.every((moji) => {
        if (moji.position.x === 5) return false;
        const index = MojiList.findIndex(
            (v) =>
                v.position.x === moji.position.x + 1 &&
                (v.position.y === moji.position.y || v.position.y === moji.position.y + 1)
        );
        if (index !== -1) return false;
        return true;
    });
};

const canMoveLeft = (controllableList: Moji[], MojiList: Moji[]) => {
    return controllableList.every((moji) => {
        if (moji.position.x === 0) return false;
        const index = MojiList.findIndex(
            (v) =>
                v.position.x === moji.position.x - 1 &&
                (v.position.y === moji.position.y || v.position.y === moji.position.y + 1)
        );
        if (index !== -1) return false;
        return true;
    });
};

const reducer: Reducer<Moji[], Action> = (prev: Moji[], action: Action): Moji[] => {
    switch (action.type) {
        case 'fall': {
            const sorted = [...prev].sort((a, b) => b.position.y - a.position.y);
            for (let i = 0; i < prev.length; i++) {
                const moji = sorted[i];
                if (moji.position.y === 25) continue;
                const index = sorted
                    .slice(0, i)
                    .findIndex((v) => v.position.y === moji.position.y + 2 && v.position.x === moji.position.x);
                if (index !== -1) continue;
                sorted[i].position.y++;
            }
            return sorted;
        }
        case 'moveDown': {
            return prev;
        }
        case 'moveRight': {
            const newState = [...prev];
            const controllableList = prev.filter((moji) => moji.controllable);
            if (canMoveRight(controllableList, prev)) {
                for (const controllable of controllableList) {
                    const index = prev.findIndex(
                        (v) => v.position.x === controllable.position.x && v.position.y === controllable.position.y
                    );
                    if (index === -1) continue;
                    newState[index].position.x++;
                }
            }
            return newState;
        }
        case 'moveLeft': {
            const newState = [...prev];
            const controllableList = prev.filter((moji) => moji.controllable);
            if (canMoveLeft(controllableList, prev)) {
                for (const controllable of controllableList) {
                    const index = prev.findIndex(
                        (v) => v.position.x === controllable.position.x && v.position.y === controllable.position.y
                    );
                    if (index === -1) continue;
                    newState[index].position.x--;
                }
            }

            return newState;
        }
        case 'add': {
            return [...prev, { position: action.payload.position, char: action.payload.char, controllable: true }];
        }
        case 'delete': {
            return prev;
        }
        case 'fix': {
            return [...prev].map((moji) => {
                return { ...moji, controllable: false };
            });
        }
    }
};

const useMojiList = () => {
    const [mojiList, dispatch] = useReducer(reducer, []);

    return { mojiList, dispatch };
};

export default useMojiList;
