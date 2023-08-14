import { style } from '@vanilla-extract/css';

export const board = style({
    position: 'relative',
    margin: '0 auto',
});

export const game = style({
    // width: '100vw',
    // height: '100vh',
    display: 'flex',
    backgroundImage: `url(img/school_room.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
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

export const nextMojiContainer = style({
    width: '150px',
    height: '270px',
    position: 'absolute',
    zIndex: 10,
    top: '10px',
    right: '-160px',
    textAlign: 'center',
    clipPath: 'polygon(0 5%, 50% 0, 50% 35%, 100% 30%, 100% 95%, 50% 100%, 50% 65%, 0 70%)',
    background: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: '#CCFFFF',
});

export const nextMoji = style({
    width: '75px',
    height: '140px',
    position: 'absolute',
    zIndex: 10,
    top: '120px',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
});

export const wNextMoji = style({
    width: '75px',
    height: '140px',
    position: 'absolute',
    zIndex: 11,
    top: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
});
