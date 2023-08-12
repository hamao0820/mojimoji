import { FC, useEffect, useState } from 'react';
import kanaKanjiMap from '../../public/toKanji.json';
import { dictionary } from './Dictionary.css';

type Props = { word: string | null };

const Dictionary: FC<Props> = ({ word }) => {
    const [lastWord, setLastWord] = useState<string>('');
    useEffect(() => {
        if (word) setLastWord(word);
    }, [word]);
    return (
        <div className={dictionary}>
            {lastWord && kanaKanjiMap[lastWord as keyof typeof kanaKanjiMap].join('/') + `(${lastWord})`}
        </div>
    );
};

export default Dictionary;
