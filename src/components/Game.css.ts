import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';
import { Config } from '../logic/config';

export const main = style({
    width: '100vw',
    height: '100vh',
});

export const board = style({
    position: 'relative',
    margin: '0 auto',
    width: `calc(${vars.mojiImgWidth} * ${Config.stageCols})`,
    overflow: 'hidden',
});

export const gameFiled = style({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundImage: 'url(/img/bg_school_room2_yuyake.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
});

export const playField = style({
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
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

export const buttonContainer = style({
    width: '250px',
    height: '50px',
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    left: 'calc(50% - 125px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
});

export const replayButton = style({
    width: '100px',
    height: '50px',
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
    width: `calc(${vars.mojiImgWidth} * 1.2 * 2)`,
    height: `calc(${vars.mojiImgWidth} * (2.1 * 2 - 1 / 2))`,
    position: 'relative',
    textAlign: 'center',
    clipPath: 'polygon(0 5%, 50% 0, 50% 35%, 100% 30%, 100% 95%, 50% 100%, 50% 65%, 0 70%)',
    background: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: '#CCFFFF',
});

export const nextMoji = style({
    width: `calc(${vars.mojiImgWidth} * 1.2)`,
    height: `calc(${vars.mojiImgWidth} * 2.1)`,
    position: 'absolute',
    zIndex: 11,
    top: `calc(${vars.mojiImgWidth} / 2.3)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
});

export const wNextMoji = style({
    width: `calc(${vars.mojiImgWidth} * 1.2)`,
    height: `calc(${vars.mojiImgWidth} * 2.1)`,
    position: 'absolute',
    zIndex: 10,
    top: `calc(${vars.mojiImgWidth} * 1.5)`,
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
});

export const nextMojiImg = style({
    width: vars.mojiImgWidth,
    height: vars.mojiImgHeight,
});

export const openHowToPlayDialogButton = style({
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '100px',
    height: '50px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
});

export const playFiledSide = style({
    height: `calc(${vars.mojiImgHeight} * ${Config.stageRows})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '15px',
});
