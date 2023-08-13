import { keyframes, style } from '@vanilla-extract/css';

const dokidoki = keyframes({
    '0%': {
        transform: 'scale(1)',
    },
    '40%': {
        transform: 'scale(1)',
    },
    '50%': {
        transform: 'scale(1.1)',
    },
    '60%': {
        transform: 'scale(1)',
    },
    '100%': {
        transform: 'scale(1)',
    },
});

export const gameOver = style({
    position: 'absolute',
    left: '0',
    top: '20%',
    width: '100%',
    animationName: dokidoki,
    animationDelay: '0s',
    animationDuration: '3s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
});
