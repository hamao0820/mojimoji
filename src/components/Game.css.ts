import { style } from '@vanilla-extract/css';

export const board = style({
    position: 'relative',
    margin: '0 auto',
});

export const game = style({
    // width: '100vw',
    // height: '100vh',
    display: 'flex',
});

export const startButton = style({
    width: '100px',
    height: '50px',
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    left: 'calc(50% - 50px)',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
});

export const replayButton = style({
    width: '100px',
    height: '50px',
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    left: 'calc(50% - 50px)',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
});

export const showHistoryButton = style({
    width: '100px',
    height: '50px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
});
