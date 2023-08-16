import { FC } from 'react';
import { MojiChar } from '../logic/moji';
import { mojiImage } from './MojiImage.css';
import { vars } from '../vars.css';

type MojiImageProps = {
    char: MojiChar;
    position: {
        left: number;
        top: number;
    };
    hidden?: boolean;
    movable?: boolean;
    rotation?: number;
};

export const MojiImage: FC<MojiImageProps> = ({ char, position, hidden, movable, rotation }) => {
    return (
        <img
            src={imagePath(char)}
            className={mojiImage}
            style={{
                visibility: hidden ? 'hidden' : 'visible',
                left: movable
                    ? `calc((${position.left} + ${Math.cos((rotation! * Math.PI) / 180)}) * ${vars.mojiImgWidth})`
                    : `calc(${position.left} * ${vars.mojiImgWidth})`,
                top: movable
                    ? `calc((${position.top} - ${Math.sin((rotation! * Math.PI) / 180)}) * ${vars.mojiImgHeight})`
                    : `calc(${position.top} * ${vars.mojiImgHeight})`,
            }}
        />
    );
};

const imagePath = (char: MojiChar): string => {
    return `img/${char}.png`;
};
