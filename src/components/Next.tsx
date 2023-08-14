import { FC } from 'react';
import { MojiChar } from '../logic/moji';
import { Config } from '../logic/config';
import { nextMoji, wNextMoji } from './Game.css';

type Props = {
    centerChar: MojiChar;
    movableChar: MojiChar;
    isW: boolean;
};

const Next: FC<Props> = ({ centerChar, movableChar, isW }) => {
    return (
        <div className={isW ? nextMoji : wNextMoji}>
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
