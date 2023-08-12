import { FC } from 'react';
import { Config } from '../logic/config';

type Props = {
    animationRatio: number;
};

export const GameOver: FC<Props> = ({ animationRatio }) => {
    const left = Math.cos(Math.PI / 2 + animationRatio * Math.PI * 2 * 10) * Config.mojiImgWidth;
    const top =
        (Math.cos(Math.PI + animationRatio * Math.PI * 2) * Config.mojiImgHeight * Config.stageRows) / 4 +
        (Config.mojiImgHeight * Config.stageRows) / 2;
    return (
        <img
            src="img/game_over.png"
            style={{
                position: 'absolute',
                left,
                top,
                width: Config.mojiImgWidth * 6,
            }}
        />
    );
};
