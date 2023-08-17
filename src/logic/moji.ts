export type MojiChar =
    | 'ん'
    | 'い'
    | 'う'
    | 'し'
    | 'か'
    | 'つ'
    | 'く'
    | 'き'
    | 'る'
    | 'よ'
    | 'り'
    | 'こ'
    | 'と'
    | 'さ'
    | 'た';

export type Moji = {
    mojiId: number;
    char: MojiChar;
};

export type MojiPosition = {
    left: number;
    top: number;
};

export type MojiOnStage = Moji & {
    position: MojiPosition;
    hidden?: boolean;
    movable?: boolean;
    rotation?: number;
};

export const mojiChars: MojiChar[] = [
    'ん',
    'い',
    'う',
    'し',
    'か',
    'つ',
    'く',
    'き',
    'る',
    'よ',
    'り',
    'こ',
    'と',
    'さ',
    'た',
];
