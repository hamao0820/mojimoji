import { style } from '@vanilla-extract/css';

export const dialog = style({
    padding: 0,
    width: '50vw',
    height: '50vh',
    borderRadius: '10px',
    overflow: 'hidden',
});

export const dialogContent = style({
    width: '100%',
    height: 'calc(100% - 5px)',
    borderRadius: '10px',
    overflow: 'auto',
    margin: '5px 0 5px 5px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'ヒラギノ丸ゴ Pro',
});

export const title = style({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'ヒラギノ丸ゴ Pro',
});

export const selectionWord = style({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'ヒラギノ丸ゴ Pro',
});

export const selectionMean = style({
    margin: '0 0 0 0rem',
});
