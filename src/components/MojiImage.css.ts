import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';

export const mojiImage = style({
    position: 'absolute',
    width: vars.mojiImgWidth,
    height: vars.mojiImgHeight,
});

