import { FC } from 'react';
import { content } from './ComboMassage.css';

type Props = {
    combo: number;
};

const ComboMessage: FC<Props> = ({ combo }) => {
    return <div className={content}>{combo}コンボ</div>;
};

export default ComboMessage;
