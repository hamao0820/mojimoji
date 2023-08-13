import { style } from '@vanilla-extract/css';

export const dialog = style({
    padding: 0,
    width: '50vw',
    height: '50vh',
    borderRadius: '10px',
});

export const dialogContent = style({
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    display: 'gird',
    placeItems: 'center',
});
