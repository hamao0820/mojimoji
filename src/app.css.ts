import { style, globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
    margin: 0,
});

export const body = style({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: "space-evenly",
    alignItems: 'center',
});
export const game = style({
    width: '45vw',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
export const board = style({ width: 450, height: 650 });
export const next = style({ width: 150, height: 250 });
export const controller = style({ width: 150, height: 400 });
export const info = style({ width: '45vw', height: '90vh' });
