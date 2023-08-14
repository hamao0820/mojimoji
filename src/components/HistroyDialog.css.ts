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
    height: '100%',
    borderRadius: '10px',
    overflow: 'auto',
    padding: '5px 0 5px 5px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'ヒラギノ丸ゴ Pro',
});
