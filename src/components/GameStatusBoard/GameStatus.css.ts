import { style } from '@vanilla-extract/css';

export const gameStatusElement = style({
    width: '40vw',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    backgroundColor: '#4dffff',
    backgroundImage: 'radial-gradient(#3cb5de 45%, transparent 65%),radial-gradient(#3cb5de 45%, transparent 65%)',
    backgroundPosition: '0 0, 3px 3px',
    backgroundSize: '6px 6px',
    color: '#fff',
    textShadow: `2.5px 2.5px 0px rgb(10, 120, 170), -2.5px -2.5px 0px rgb(10, 120, 170),
                 -2.5px 2.5px 0px rgb(10, 120, 170),  2.5px -2.5px 0px rgb(10, 120, 170),
                 2.5px 0px 0px rgb(10, 120, 170), -2.5px -0px 0px rgb(10, 120, 170),
                 0px 2.5px 0px rgb(10, 120, 170),  0px -2.5px 0px rgb(10, 120, 170)`,
    fontFamily: 'ヒラギノ丸ゴ Pro',
});

export const gameStatusElementTitle = style({
    margin: '0 0 0 1rem',
});

export const gameStatusElementValue = style({
    margin: '0 1rem 0 0',
});
