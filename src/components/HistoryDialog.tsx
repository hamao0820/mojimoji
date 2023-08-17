import { FC, Fragment, useCallback, useEffect, useRef } from 'react';
// import kanaKanjiMap from '../../public/toKanji.json';
import { dialog, dialogContent } from './HistroyDialog.css';
import { RemoveScroll } from 'react-remove-scroll';

type Props = {
    history: string[];
    isOpen: boolean;
    onClose: () => void;
};

const HistoryDialog: FC<Props> = ({ history, isOpen, onClose }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect((): void => {
        const dialogElement = dialogRef.current;
        if (!dialogElement) {
            return;
        }
        if (isOpen) {
            if (dialogElement.hasAttribute('open')) {
                return;
            }
            dialogElement.showModal();
        } else {
            if (!dialogElement.hasAttribute('open')) {
                return;
            }
            dialogElement.close();
        }
    }, [isOpen]);

    const handleClickDialog = useCallback((): void => {
        onClose();
    }, [onClose]);

    const handleClickContent = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
        // clickイベントの伝搬を止める。
        event.stopPropagation();
    }, []);

    return (
        <RemoveScroll removeScrollBar enabled={isOpen}>
            <dialog ref={dialogRef} onClick={handleClickDialog} className={dialog}>
                <div className={dialogContent} onClick={handleClickContent}>
                    {history.map((word) => {
                        // TODO
                        const kanjiList: string[] = [];
                        return (
                            <div key={crypto.randomUUID()}>
                                {word}[
                                {kanjiList.map((kanji, i) => (
                                    <Fragment key={crypto.randomUUID()}>
                                        <a href={`https://www.weblio.jp/content/${kanji}`} target="_blank">
                                            {kanji}
                                        </a>
                                        {i !== kanjiList.length - 1 && <p style={{ display: 'inline' }}>/</p>}
                                    </Fragment>
                                ))}
                                ]
                            </div>
                        );
                    })}
                </div>
            </dialog>
        </RemoveScroll>
    );
};

export default HistoryDialog;
