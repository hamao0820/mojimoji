import { style } from '@vanilla-extract/css';

export const board = style({
    position: 'relative',
    margin: '0 auto',
    overflow: 'hidden',
});

export const game = style({
    // width: '100vw',
    // height: '100vh',
    display: 'flex',
});

export const startButton = style({
    width: '100px',
    height: '50px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
});
