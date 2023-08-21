import { FC, useCallback, useEffect, useRef } from 'react';
import { dialog, dialogContent, selectionMean, selectionWord, title } from './HistroyDialog.css';
import { RemoveScroll } from 'react-remove-scroll';
import dict from '../utility/dict';

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
                        const contentList = dict[word];
                        return (
                            <div key={crypto.randomUUID()}>
                                <div className={title}>{word}</div>
                                <ol>
                                    {contentList.map((content) => (
                                        <li key={crypto.randomUUID()}>
                                            <div className={selectionWord}>{content.writing}</div>
                                            <div className={selectionMean}>{content.mean}</div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        );
                    })}
                </div>
            </dialog>
        </RemoveScroll>
    );
};

export default HistoryDialog;
