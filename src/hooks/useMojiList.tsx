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
    | { type: 'delete' };

const reducer: Reducer<Moji[], Action> = (prev: Moji[], action: Action): Moji[] => {
    switch (action.type) {
        case 'fall': {
            const sorted = [...prev].sort((a, b) => b.position.y - a.position.y);
            for (let i = 0; i < prev.length; i++) {
                const moji = sorted[i];
                if (moji.position.y === 12) continue;
                const index = sorted
                    .slice(0, i)
                    .findIndex((v) => v.position.y === moji.position.y + 1 && v.position.x === moji.position.x);
                if (index !== -1) continue;
                sorted[i].position.y++;
            }
            return sorted;
        }
        case 'moveDown': {
            return prev;
        }
        case 'moveRight': {
            return prev;
        }
        case 'moveLeft': {
            return prev;
        }
        case 'add': {
            return [...prev, { position: action.payload.position, char: action.payload.char, controllable: true }];
        }
        case 'delete': {
            return prev;
        }
    }
};

const useMojiList = () => {
    const [mojiList, dispatch] = useReducer(reducer, []);

    return { mojiList, dispatch };
};

export default useMojiList;
