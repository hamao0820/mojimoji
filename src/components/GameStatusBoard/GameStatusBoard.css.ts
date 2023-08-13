import { style } from '@vanilla-extract/css';

export const gameStatusBoard = style({
    width: '30vw',
    height: '90vh',
    border: '2px solid black',
    borderRadius: '10px',
});

export const gameStatusElement = style({
    width: '90%',
    height: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0 auto',
});

export const gameStatusElementTitle = style({
    fontSize: '1.3rem',
    fontWeight: 'bold',
});

export const gameStatusElementValue = style({
    margin: '0 0 0 1rem',
    fontSize: '2rem',
    fontWeight: 'bold',
    flex: '1',
    textAlign: 'right',
    border: 'solid black',
    borderWidth: '0 0 3px 0',
});
