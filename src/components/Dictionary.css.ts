import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';

export const box = style({
    width: `calc(${vars.mojiImgWidth} * 3.5)`,
    height: `calc(${vars.mojiImgHeight} * 3)`,
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    display: 'grid',
    placeItems: 'center',
});

export const container = style({
    width: `calc(${vars.mojiImgWidth} * 3)`,
    height: `calc(${vars.mojiImgHeight} * 1.5)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 1,
    position: 'relative',
    bottom: `calc(${vars.mojiImgHeight} / 6)`,
});

export const kanaContainer = style({
    width: '100%',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

export const wordContainer = style({
    width: '100%',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

export const meanContainer = style({
    width: '100%',
    textAlign: 'left',
    flex: 1,
    overflow: 'hidden',
});

export const contentText = style({
    padding: '0 3px',
});

export const cornerBracket = style({
    fontFamily: 'YakuHanJPs',
});

export const bookImage = style({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
});
