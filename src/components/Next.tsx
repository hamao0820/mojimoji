import { FC } from 'react';
import { MojiChar } from '../logic/moji';
import { Config } from '../logic/config';

type Props = {
    centerChar: MojiChar;
    movableChar: MojiChar;
};

const Next: FC<Props> = ({ centerChar, movableChar }) => {
    return (
        <div>
            <div>
                <img
                    src={imagePath(movableChar)}
                    style={{ width: Math.floor(Config.mojiImgWidth), height: Math.floor(Config.mojiImgHeight) }}
                />
            </div>
            <div>
                <img
                    src={imagePath(centerChar)}
                    style={{ width: Math.floor(Config.mojiImgWidth), height: Math.floor(Config.mojiImgHeight) }}
                />
            </div>
        </div>
    );
};

const imagePath = (char: MojiChar): string => {
    return `img/${char}.png`;
};

export default Next;
