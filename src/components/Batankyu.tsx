import { FC } from 'react';
import { Config } from '../logic/config';

type BatankyuProps = {
    animationRatio: number;
};

export const Batankyu: FC<BatankyuProps> = ({ animationRatio }) => {
    const left = Math.cos(Math.PI / 2 + animationRatio * Math.PI * 2 * 10) * Config.mojiImgWidth;
    const top =
        (Math.cos(Math.PI + animationRatio * Math.PI * 2) * Config.mojiImgHeight * Config.stageRows) / 4 +
        (Config.mojiImgHeight * Config.stageRows) / 2;
    return (
        <img
            src="img/batankyu.png"
            style={{
                position: 'absolute',
                left,
                top,
                width: Config.mojiImgWidth * 6,
            }}
        />
    );
};
