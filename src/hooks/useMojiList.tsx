import { Reducer, useReducer } from 'react';
import { Position } from './useGame';

export type Id = `${string}-${string}-${string}-${string}-${string}`;
export type Moji = {
    position: Position;
    char: string;
    controllable: boolean;
    axis: boolean;
    id: Id;
};
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
    | { type: 'generate' }
    | { type: 'delete'; payload: { idList: Id[] } }
    | { type: 'fix' };

const canMoveRight = (controllableList: Moji[], MojiList: Moji[]) => {
    const axis = controllableList.find((moji) => moji.axis);
    const child = controllableList.find((moji) => !moji.axis);
    if (!axis || !child) return false;
    const childRelativePosition = getChildRelativePosition(controllableList as [Moji, Moji]);
    switch (childRelativePosition) {
        case 'top':
        case 'bottom': {
            return controllableList.every((moji) => {
                if (moji.position.x === 5) return false;
                const index = MojiList.findIndex(
                    (v) =>
                        v.position.x === moji.position.x + 1 &&
                        (v.position.y === moji.position.y || v.position.y === moji.position.y + 1)
                );
                return index === -1;
            });
        }
        case 'right': {
            if (child.position.x === 5) return false;
            const index = MojiList.findIndex(
                (v) =>
                    v.position.x === child.position.x + 1 &&
                    (v.position.y === child.position.y || v.position.y === child.position.y + 1)
            );
            return index === -1;
        }
        case 'left': {
            if (axis.position.x === 5) return false;
            const index = MojiList.findIndex(
                (v) =>
                    v.position.x === axis.position.x + 1 &&
                    (v.position.y === axis.position.y || v.position.y === axis.position.y + 1)
            );
            return index === -1;
        }
    }
};

const canMoveLeft = (controllableList: Moji[], MojiList: Moji[]) => {
    const axis = controllableList.find((moji) => moji.axis);
    const child = controllableList.find((moji) => !moji.axis);
    if (!axis || !child) return false;
    const childRelativePosition = getChildRelativePosition(controllableList as [Moji, Moji]);
    switch (childRelativePosition) {
        case 'top':
        case 'bottom': {
            return controllableList.every((moji) => {
                if (moji.position.x === 0) return false;
                const index = MojiList.findIndex(
                    (v) =>
                        v.position.x === moji.position.x - 1 &&
                        (v.position.y === moji.position.y || v.position.y === moji.position.y + 1)
                );
                return index === -1;
            });
        }
        case 'right': {
            if (axis.position.x === 0) return false;
            const index = MojiList.findIndex(
                (v) =>
                    v.position.x === axis.position.x - 1 &&
                    (v.position.y === axis.position.y || v.position.y === axis.position.y + 1)
            );
            return index === -1;
        }
        case 'left': {
            if (child.position.x === 0) return false;
            const index = MojiList.findIndex(
                (v) =>
                    v.position.x === child.position.x - 1 &&
                    (v.position.y === child.position.y || v.position.y === child.position.y + 1)
            );
            return index === -1;
        }
    }
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

const canTurnTopToLeft = (controllableList: Moji[], mojiList: Moji[]): boolean => {
    const child = controllableList.find((moji) => !moji.axis);
    if (!child) {
        console.log('childが見つかりませんでした');
        return false;
    }
    if (child.position.x === 0) return false;
    return mojiList.every(
        (v) =>
            v.position.x !== child.position.x - 1 ||
            (v.position.y !== child.position.y + 1 &&
                v.position.y !== child.position.y + 2 &&
                v.position.y !== child.position.y + 3)
    );
};
const canTurnLeftToBottom = (controllableList: Moji[], mojiList: Moji[]): boolean => {
    const child = controllableList.find((moji) => !moji.axis);
    if (!child) {
        console.log('childが見つかりませんでした');
        return false;
    }
    if (child.position.y >= 24) return false;
    return mojiList.every(
        (v) =>
            v.position.x !== child.position.x + 1 ||
            (v.position.y !== child.position.y + 1 &&
                v.position.y !== child.position.y + 2 &&
                v.position.y !== child.position.y + 3)
    );
};
const canTurnBottomToRight = (controllableList: Moji[], mojiList: Moji[]): boolean => {
    const child = controllableList.find((moji) => !moji.axis);
    if (!child) {
        console.log('childが見つかりませんでした');
        return false;
    }
    if (child.position.x === 5) return false;
    return mojiList.every(
        (v) =>
            v.position.x !== child.position.x + 1 ||
            (v.position.y !== child.position.y - 1 &&
                v.position.y !== child.position.y - 2 &&
                v.position.y !== child.position.y - 3)
    );
};
const canTurnRightToTop = (controllableList: Moji[], mojiList: Moji[]): boolean => {
    const child = controllableList.find((moji) => !moji.axis);
    if (!child) {
        console.log('childが見つかりませんでした');
        return false;
    }
    if (child.position.y === 0) return false;
    return mojiList.every(
        (v) =>
            v.position.x !== child.position.x - 1 ||
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
                    const index = prev.findIndex((v) => controllable.id === v.id);
                    if (index === -1) continue;
                    newState[index].position.y++;
                }
            }
            return newState;
        }
        case 'moveRight': {
            const newState = [...prev];
            const controllableList = prev.filter((moji) => moji.controllable);
            if (canMoveRight(controllableList, prev)) {
                for (const controllable of controllableList) {
                    const index = prev.findIndex((v) => controllable.id === v.id);
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
                    const index = prev.findIndex((v) => controllable.id === v.id);
                    if (index === -1) continue;
                    newState[index].position.x--;
                }
            }

            return newState;
        }
        case 'turnLeft': {
            const newState = structuredClone(prev);
            const controllableList = prev.filter((moji) => moji.controllable);
            if (controllableList.length === 0) return prev;
            const child = controllableList.find((moji) => !moji.axis);
            if (!child) {
                console.log('childが見つかりませんでした');
                return prev;
            }
            const childRelativePosition = getChildRelativePosition(controllableList as [Moji, Moji]);
            switch (childRelativePosition) {
                case 'bottom': {
                    if (canTurnBottomToRight(controllableList, prev)) {
                        const index = prev.findIndex((v) => child.id === v.id);
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x += 1;
                        newState[index].position.y -= 2;
                    }
                    return newState;
                }
                case 'left': {
                    if (canTurnLeftToBottom(controllableList, prev)) {
                        const index = prev.findIndex((v) => v.id === child.id);
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x += 1;
                        newState[index].position.y += 2;
                    }
                    return newState;
                }
                case 'top': {
                    if (canTurnTopToLeft(controllableList, prev)) {
                        const index = prev.findIndex((v) => child.id === v.id);
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x -= 1;
                        newState[index].position.y += 2;
                    }
                    return newState;
                }
                case 'right': {
                    if (canTurnRightToTop(controllableList, prev)) {
                        const index = prev.findIndex((v) => child.id === v.id);
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x -= 1;
                        newState[index].position.y -= 2;
                    }
                    return newState;
                }
                default:
                    return prev;
            }
        }
        case 'turnRight': {
            const newState = structuredClone(prev);
            const controllableList = prev.filter((moji) => moji.controllable);
            if (controllableList.length === 0) return prev;
            const child = controllableList.find((moji) => !moji.axis);
            if (!child) {
                console.log('childが見つかりませんでした');
                return prev;
            }
            const childRelativePosition = getChildRelativePosition(controllableList as [Moji, Moji]);
            switch (childRelativePosition) {
                case 'bottom': {
                    if (canTurnBottomToLeft(controllableList, prev)) {
                        const index = prev.findIndex((v) => child.id === v.id);
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
                        const index = prev.findIndex((v) => v.id === child.id);
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
                        const index = prev.findIndex((v) => child.id === v.id);
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
                        const index = prev.findIndex((v) => child.id === v.id);
                        if (index === -1) {
                            console.log('childが見つかりませんでした');
                            return prev;
                        }
                        newState[index].position.x -= 1;
                        newState[index].position.y += 2;
                    }
                    return newState;
                }
                default: {
                    return prev;
                }
            }
        }
        case 'generate': {
            if (prev.some((moji) => moji.position.x === 2 && moji.position.y === 3 && !moji.controllable))
                return [...prev];

            const charList = [...'ウイシクツヨキリカ'];
            const axis: Moji = {
                position: { y: 2, x: 2 },
                char: charList[Math.floor(Math.random() * charList.length)],
                axis: true,
                id: crypto.randomUUID(),
                controllable: true,
            };
            const child: Moji = {
                position: { y: 0, x: 2 },
                char: charList[Math.floor(Math.random() * charList.length)],
                axis: false,
                id: crypto.randomUUID(),
                controllable: true,
            };

            return [...prev, axis, child];
        }
        case 'delete': {
            return prev.filter((moji) => !action.payload.idList.includes(moji.id));
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
