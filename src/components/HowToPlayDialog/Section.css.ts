import { style } from '@vanilla-extract/css';

export const section = style({
    padding: 0,
    width: '100%',
    margin: '10px 0',
});

export const header = style({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const indexClass = style({
    fontSize: '1.5em',
    fontWeight: 'bold',
    fontFamily: 'ヒラギノ丸ゴ Pro',
});

export const titleClass = style({
    flex: 1,
    fontSize: '2em',
    fontWeight: 'bold',
    fontFamily: 'ヒラギノ丸ゴ Pro',
});

export const content = style({
    fontSize: '1.2em',
    fontWeight: 'bold',
    fontFamily: 'ヒラギノ丸ゴ Pro',
});
