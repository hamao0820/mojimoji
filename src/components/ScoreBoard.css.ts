import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';
import { Config } from '../logic/config';

export const scoreBoard = style({
    margin: '0 auto',
    overflow: 'hidden',
    textAlign: 'right',
    backgroundColor: vars.scoreBackgroundColor,
    width: `calc(${vars.mojiImgWidth} * ${Config.stageCols})`,
    height: vars.fontHeight,
});
