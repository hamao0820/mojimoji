import { FC } from 'react';
import { MojiChar } from '../logic/moji';
import { mojiImage } from './MojiImage.css';

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
            className={mojiImage}
            style={{
                visibility: hidden ? 'hidden' : 'visible',
                left: position.left,
                top: position.top,
            }}
        />
    );
};

const imagePath = (char: MojiChar): string => {
    return `img/${char}.png`;
};
