export type MojiColor = 1 | 2 | 3 | 4 | 5;

export type Moji = {
    mojiId: number;
    color: MojiColor;
};

export type MojiPosition = {
    left: number;
    top: number;
};

export type MojiOnStage = Moji & {
    position: MojiPosition;
    hidden?: boolean;
};
