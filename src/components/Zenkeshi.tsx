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
    const opacity = hideRatio > 0.8 ? 1 - hideRatio : 1;

    return (
        <img
            src="img/sukkiri.png"
            style={{
                position: 'absolute',
                top,
                opacity,
                width: Config.mojiImgWidth * 6,
            }}
        />
    );
};
