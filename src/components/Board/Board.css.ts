import { style } from '@vanilla-extract/css';

export const board = style({
    width: 330,
    height: 660,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    border: 'solid 1px black',
});
