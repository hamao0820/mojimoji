export type MojiChar = 'ウ' | 'イ' | 'シ' | 'ク' | 'ツ' | 'ヨ' | 'キ' | 'リ' | 'カ';

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

export const mojiChars: MojiChar[] = ['ウ', 'イ', 'シ', 'ク', 'ツ', 'ヨ', 'キ', 'リ', 'カ'];
