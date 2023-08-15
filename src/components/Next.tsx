import { FC } from 'react';
import { MojiChar } from '../logic/moji';
import { nextMoji, nextMojiImg, wNextMoji } from './Game.css';

type Props = {
    centerChar: MojiChar;
    movableChar: MojiChar;
    isW: boolean;
};

const Next: FC<Props> = ({ centerChar, movableChar, isW }) => {
    return (
        <div className={isW ? nextMoji : wNextMoji}>
            <div>
                <img src={imagePath(movableChar)} className={nextMojiImg} />
            </div>
            <div>
                <img src={imagePath(centerChar)} className={nextMojiImg} />
            </div>
        </div>
    );
};

const imagePath = (char: MojiChar): string => {
    return `img/${char}.png`;
};

export default Next;
