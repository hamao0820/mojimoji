import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';

export const zenkeshiImage = style({
    position: 'absolute',
    width: `calc(${vars.mojiImgWidth} * 6)`,
});
