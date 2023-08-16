import { FC } from 'react';
import { zenkeshiImage } from './ZenkeshiImage.css';
import { vars } from '../vars.css';
import { Config } from '../logic/config';

type ZenkeshiProps = {
    showRatio: number;
    hideRatio: number;
};

export const ZenkeshiImage: FC<ZenkeshiProps> = ({ showRatio, hideRatio }) => {
    const startTop = `${vars.mojiImgHeight} * ${Config.stageRows}`;
    const endTop = `(${vars.mojiImgWidth} * ${Config.stageRows}) / 3`;
    const top = `calc((${endTop} - ${startTop}) * ${showRatio} + ${startTop})`;
    const opacity = hideRatio > 0.8 ? 1 - hideRatio : 1;

    return <img src="img/sukkiri.png" className={zenkeshiImage} style={{ top, opacity }} />;
};
