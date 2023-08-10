import { style } from '@vanilla-extract/css';

export const board = style({
    width: 330,
    height: 660,
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(24, 1fr)',
    border: 'solid 1px black',
});

export const cell = style({
    width: 55,
    height: 27.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bolder',
    fontSize: '2.5rem',
    padding: 0,
});
