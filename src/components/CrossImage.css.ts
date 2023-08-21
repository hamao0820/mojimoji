import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';

export const crossImage = style({
    position: 'absolute',
    left: `calc(${vars.mojiImgWidth} * 2)`,
    top: 0,
    width: vars.mojiImgWidth,
    height: vars.mojiImgHeight,
    opacity: 0.5,
});
