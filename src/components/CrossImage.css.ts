import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';

export const crossImage = style({
    position: 'absolute',
    left: '120px',
    top: 0,
    width: vars.mojiImgWidth,
    height: vars.mojiImgHeight,
    opacity: 0.5,
});
