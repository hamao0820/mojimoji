import { FC } from 'react';
import { Config } from '../logic/config';
import { MojiChar } from '../logic/moji';

type MojiImageProps = {
    char: MojiChar;
    position: {
        left: number;
        top: number;
    };
    hidden?: boolean;
};

export const MojiImage: FC<MojiImageProps> = ({ char, position, hidden }) => {
    return (
        <img
            src={imagePath(char)}
            style={{
                position: 'absolute',
                visibility: hidden ? 'hidden' : 'visible',
                left: position.left,
                top: position.top,
                width: Math.floor(Config.mojiImgWidth),
                height: Math.floor(Config.mojiImgHeight),
            }}
        />
    );
};

const imagePath = (char: MojiChar): string => {
    return `img/${char}.png`;
};
