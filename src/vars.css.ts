import { createGlobalTheme } from '@vanilla-extract/css';
import { Config } from './logic/config';

export const vars = createGlobalTheme(':root', {
    fontHeight: '33px',
    mojiImgWidth: `calc((100vh - 33px) / ${Config.stageRows})`,
    mojiImgHeight: `calc((100vh - 33px) / ${Config.stageRows})`,
    stageBackgroundColor: 'rgba(255, 255, 255, 0.5)',
    scoreBackgroundColor: '#000000',
});

