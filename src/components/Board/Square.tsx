import { FC } from 'react';
import { square } from './Square.css';

type Props = { moji: string };

const Square: FC<Props> = ({ moji }) => {
    return <div className={square}>{moji}</div>;
};

export default Square;
