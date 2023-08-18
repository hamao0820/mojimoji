import { keyframes, style } from '@vanilla-extract/css';

const fadeRightAnime = keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateX(100px)',
    },
    '60%': {
        opacity: 1,
        transform: 'translateX(0)',
    },
    '90%': {
        opacity: 0,
    },
    '100%': {
        transform: 'translateX(20px)',
    },
});

export const content = style({
    width: '300px',
    position: 'absolute',
    right: 0,
    bottom: '30%',
    backgroundColor: 'rgba(255,255,255,0)',
    zIndex: 100,
    animationName: fadeRightAnime,
    animationDuration: '1s',
    animationFillMode: 'forwards',
    opacity: 0,
    fontSize: '2em',
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});
