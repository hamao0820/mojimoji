import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';
import { Config } from '../logic/config';

export const gameStage = style({
    width: `calc(${vars.mojiImgHeight} * ${Config.stageCols})`,
    height: `calc(${vars.mojiImgHeight} * ${Config.stageRows})`,
    backgroundColor: '#ffffff',
});

export const gameStageInner = style({
    width: `calc(${vars.mojiImgHeight} * ${Config.stageCols})`,
    height: `calc(${vars.mojiImgHeight} * ${Config.stageRows})`,
    backgroundColor: vars.stageBackgroundColor,
    backgroundImage: 'url(/img/mojimoji.png)',
    backgroundBlendMode: 'lighten',
});
