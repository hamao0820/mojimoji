import { style } from '@vanilla-extract/css';

export const square = style({
    width: 55,
    height: 55,
    textAlign: 'center',
    border: 'dashed 1px black',
    boxSizing: 'border-box',
    padding: 'auto 0',
    fontWeight: 'bolder',
    fontSize: '2.5rem',
});
