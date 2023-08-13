import { FC, useCallback, useEffect, useRef } from 'react';
import kanaKanjiMap from '../../public/toKanji.json';
import { dialog, dialogContent } from './HistroyDialog.css';

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
        <dialog ref={dialogRef} onClick={handleClickDialog} className={dialog}>
            <div className={dialogContent} onClick={handleClickContent}>
                {history.map((word) => {
                    return (
                        <div key={crypto.randomUUID()}>
                            {word}[{kanaKanjiMap[word as keyof typeof kanaKanjiMap].join('/')}]
                        </div>
                    );
                })}
            </div>
        </dialog>
    );
};

export default HistoryDialog;
