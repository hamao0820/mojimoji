import { FC } from 'react';
import { Config } from '../logic/config';
import { MojiColor } from '../logic/moji';

type MojiImageProps = {
    color: MojiColor;
    position: {
        left: number;
        top: number;
    };
    hidden?: boolean;
};

export const MojiImage: FC<MojiImageProps> = ({ color, position, hidden }) => {
    return (
        <img
            src={imagePath(color)}
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

function imagePath(color: MojiColor): string {
    return `img/moji_${color}.png`;
}
