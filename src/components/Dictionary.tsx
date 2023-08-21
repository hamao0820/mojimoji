import { FC } from 'react';
import {
    bookImage,
    box,
    container,
    contentText,
    cornerBracket,
    kanaContainer,
    meanContainer,
    wordContainer,
} from './Dictionary.css';
import dict from '../utility/dict';
import 'yakuhanjp/dist/css/yakuhanjp_s.css';

type Props = { word: string };

const Dictionary: FC<Props> = ({ word }) => {
    return (
        <div className={box}>
            <img src="img/book.png" className={bookImage} />
            <div className={container}>
                <div className={kanaContainer}>
                    <div className={contentText}>{word}</div>
                </div>
                <div className={wordContainer}>
                    <div className={contentText}>
                        {word === '' ? (
                            ''
                        ) : (
                            <>
                                <span className={cornerBracket}>【</span>
                                {dict[word][0].writing}
                                <span className={cornerBracket}>】</span>
                            </>
                        )}
                    </div>
                </div>
                <div className={meanContainer}>
                    <div className={contentText}>{word === '' ? '' : dict[word][0].mean}</div>
                </div>
            </div>
        </div>
    );
};

export default Dictionary;
