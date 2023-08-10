import { Reducer, useReducer } from 'react';
import { Position } from './useGame';

export type Moji = { position: Position; char: string; controllable: boolean; axis: boolean };
type ChildRelativePosition = 'top' | 'right' | 'bottom' | 'left';
export type Action =
    | {
          type: 'fall';
      }
    | { type: 'moveDown' }
    | { type: 'moveRight' }
    | { type: 'moveLeft' }
    | { type: 'turnRight' }
    | { type: 'turnLeft' }
    | { type: 'add'; payload: { position: Position; char: string; axis: boolean } }
    | { type: 'delete' }
    | { type: 'fix' };

// TODO: 左右に並んでいる時の判定を修正
const canMoveRight = (controllableList: Moji[], MojiList: Moji[]) => {
    return controllableList.every((moji) => {
        if (moji.position.x === 5) return false;
        const index = MojiList.findIndex(
            (v) =>
                v.position.x === moji.position.x + 1 &&
                (v.position.y === moji.position.y || v.position.y === moji.position.y + 1)
        );
        return index === -1;
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
        return index === -1;
    });
};

const canMoveDown = (controllableList: Moji[], MojiList: Moji[]) => {
    return controllableList.every((moji) => {
        if (moji.position.y === 25) return false;
        const index = MojiList.findIndex(
            (v) =>
                v.position.x === moji.position.x &&
                (v.position.y === moji.position.y + 1 || (v.position.y === moji.position.y + 2 && !v.controllable))
        );
        return index === -1;
    });
};

const getChildRelativePosition = (controllableList: [Moji, Moji]): ChildRelativePosition => {
    const axisMoji = controllableList.find((moji) => moji.axis);
    const childMoji = controllableList.find((moji) => !moji.axis);
    if (!axisMoji || !childMoji) throw Error;
    const relativeX = axisMoji.position.x - childMoji.position.x;
    const relativeY = axisMoji.position.y - childMoji.position.y;
    if (relativeX === 0 && relativeY === 2) return 'top';
    if (relativeX === 0 && relativeY === -2) return 'bottom';
    if (relativeX === 1 && relativeY === 0) return 'left';
    if (relativeX === -1 && relativeY === 0) return 'right';
    return 'top';
};

const canTurnTopToRight = (controllableList: Moji[], mojiList: Moji[]): boolean => {
    const child = controllableList.find((moji) => !moji.axis);
    if (!child) {
        console.log('childが見つかりませんでした');
        return false;
    }
    if (child.position.x === 5) return false;
    return mojiList.every(
        (v) =>
            v.position.x !== child.position.x + 1 ||
            (v.position.y !== child.position.y + 1 &&
                v.position.y !== child.position.y + 2 &&
                v.position.y !== child.position.y + 3)
    );
};
const canTurnRightToBottom = (controllableList: Moji[], mojiList: Moji[]): boolean => {
    const child = controllableList.find((moji) => !moji.axis);
    if (!child) {
        console.log('childが見つかりませんでした');
        return false;
    }
    if (child.position.y >= 24) return false;
    return mojiList.every(
        (v) =>
            v.position.x !== child.position.x - 1 ||
            (v.position.y !== child.position.y + 1 &&
                v.position.y !== child.position.y + 2 &&
                v.position.y !== child.position.y + 3)
    );
};
const canTurnBottomToLeft = (controllableList: Moji[], mojiList: Moji[]): boolean => {
    const child = controllableList.find((moji) => !moji.axis);
    if (!child) {
        console.log('childが見つかりませんでした');
        return false;
    }
    if (child.position.x === 0) return false;
    return mojiList.every(
        (v) =>
            v.position.x !== child.position.x - 1 ||
            (v.position.y !== child.position.y - 1 &&
                v.position.y !== child.position.y - 2 &&
                v.position.y !== child.position.y - 3)
    );
};
const canTurnLeftToTop = (controllableList: Moji[], mojiList: Moji[]): boolean => {
    const child = controllableList.find((moji) => !moji.axis);
    if (!child) {
        console.log('childが見つかりませんでした');
        return false;
    }
    if (child.position.y === 0) return false;
    return mojiList.every(
        (v) =>
            v.position.x !== child.position.x + 1 ||
            (v.position.y !== child.position.y - 1 &&
                v.position.y !== child.position.y - 2 &&
                v.position.y !== child.position.y - 3)
    );
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
            const newState = [...prev];
            const controllableList = prev.filter((moji) => moji.controllable);
            if (canMoveDown(controllableList, prev)) {
                for (const controllable of controllableList) {
                    const index = prev.findIndex(
                        (v) => v.position.x === controllable.position.x && v.position.y === controllable.position.y
                    );
                    if (index === -1) continue;
                    newState[index].position.y++;
                }
            }
            return newState;
        }
        // TODO; 左右に並んでいるときも動くようにの修正
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
        case 'turnLeft': {
            return prev;
        }
        case 'turnRight': {
            const newState = structuredClone(prev);
            const controllableList = prev.filter((moji) => moji.controllable);
            const child = controllableList.find((moji) => !moji.axis);
            if (!child) {
                console.log('childが見つかりませんでした');
                return prev;
            }
            const childRelativePosition = getChildRelativePosition(controllableList as [Moji, Moji]);
            switch (childRelativePosition) {
                case 'bottom': {
                    if (canTurnBottomToLeft(controllableList, prev)) {
                        const index = prev.findIndex(
                            (v) => v.position.x === child.position.x && v.position.y === child.position.y
                        );
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x -= 1;
                        newState[index].position.y -= 2;
                    }
                    return newState;
                }
                case 'left': {
                    if (canTurnLeftToTop(controllableList, prev)) {
                        const index = prev.findIndex(
                            (v) => v.position.x === child.position.x && v.position.y === child.position.y
                        );
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x += 1;
                        newState[index].position.y -= 2;
                    }
                    return newState;
                }
                case 'top': {
                    if (canTurnTopToRight(controllableList, prev)) {
                        const index = prev.findIndex(
                            (v) => v.position.x === child.position.x && v.position.y === child.position.y
                        );
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x += 1;
                        newState[index].position.y += 2;
                    }
                    return newState;
                }
                case 'right': {
                    if (canTurnRightToBottom(controllableList, prev)) {
                        const index = prev.findIndex(
                            (v) => v.position.x === child.position.x && v.position.y === child.position.y
                        );
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x -= 1;
                        newState[index].position.y += 2;
                    }
                    return newState;
                }
            }
            return prev;
        }
        case 'add': {
            return [
                ...prev,
                {
                    position: action.payload.position,
                    char: action.payload.char,
                    controllable: true,
                    axis: action.payload.axis,
                },
            ];
        }
        case 'delete': {
            return prev;
        }
        case 'fix': {
            return [...prev].map((moji) => {
                return { ...moji, controllable: false, axis: false };
            });
        }
    }
};

const useMojiList = () => {
    const [mojiList, dispatch] = useReducer(reducer, []);

    return { mojiList, dispatch };
};

export default useMojiList;
