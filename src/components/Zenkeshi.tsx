import { FC } from 'react';
import { Config } from '../logic/config';

type ZenkeshiProps = {
    showRatio: number;
    hideRatio: number;
};

export const Zenkeshi: FC<ZenkeshiProps> = ({ showRatio, hideRatio }) => {
    const startTop = Config.mojiImgHeight * Config.stageRows;
    const endTop = (Config.mojiImgHeight * Config.stageRows) / 3;
    const top = (endTop - startTop) * showRatio + startTop;
    const opacity = 1 - hideRatio;

    return (
        <img
            src="img/zenkeshi.png"
            style={{
                position: 'absolute',
                top,
                opacity,
                width: Config.mojiImgWidth * 6,
            }}
        />
    );
};
