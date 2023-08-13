import { FC } from 'react';
import kanaKanjiMap from '../../public/toKanji.json';
import { dictionary } from './Dictionary.css';

type Props = { word: string };

const Dictionary: FC<Props> = ({ word }) => {
    return (
        <div className={dictionary}>
            {word && kanaKanjiMap[word as keyof typeof kanaKanjiMap].join('/') + `(${word})`}
        </div>
    );
};

export default Dictionary;
