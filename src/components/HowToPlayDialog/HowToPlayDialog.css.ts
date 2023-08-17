import { style } from '@vanilla-extract/css';

export const dialog = style({
    padding: 0,
    width: '90vw',
    height: '90vh',
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

export const header = style({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const title = style({
    fontSize: '3em',
    fontWeight: 'bold',
    fontFamily: 'ヒラギノ丸ゴ Pro',
});

export const closeButton = style({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
        backgroundColor: '#eee',
    },
    position: 'sticky',
    zIndex: 1,
});
