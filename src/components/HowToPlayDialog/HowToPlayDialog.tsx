import { FC, useCallback, useEffect, useRef } from 'react';
import { closeButton, dialog, dialogContent, header, title } from './HowToPlayDialog.css';
import { RemoveScroll } from 'react-remove-scroll';
import Section from './Section';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const HowToPlayDialog: FC<Props> = ({ isOpen, onClose }) => {
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
                    <button className={closeButton} onClick={onClose}>
                        X
                    </button>
                    <div className={header}>
                        <div className={title}>~遊び方~</div>
                    </div>
                    <Section index={1} title="スタートボタンを押す">
                        <div>スタートボタンを押しましょう</div>
                    </Section>
                    <Section index={2} title='落ちてくる"もじ"を操作する'>
                        <div>
                            "もじ"が上から落ちてくるので、十字キーで操作しましょう。"もじ"は2個がセットで落ちてきます。上矢印を押すと上側の"もじ"を時計回りに回転することができます。下矢印を押すと、素早く落とすことができます。
                        </div>
                    </Section>
                    <Section index={3} title="単語を作る">
                        <div>
                            落ちてきた"もじ"は積み立てられていきます。"もじ"を並べて単語を作りましょう。上から下か、左から右への向きで単語を作ります。
                        </div>
                    </Section>
                    <Section index={4} title="文字を消す">
                        <div>"もじ"が揃って単語ができると、単語が消えてスコアが入ります。</div>
                    </Section>
                    <Section index={5} title="コンボを目指す">
                        <div>
                            消えた"もじ"の上に別の"もじ"があった場合、その"もじ"が落ちてきます。落ちた後に単語が揃うとその単語も消えます。コンボが続くと高いスコアを得ることができます。
                        </div>
                    </Section>
                    <Section index={6} title="ゲームオーバー">
                        <div>
                            "もじ"がどんどん積み上がっていって、❌印の場所まで積み上がると、ゲームオーバーになります。ゲームオーバーにならないようにたくさん単語を作って消していきましょう。
                        </div>
                    </Section>
                    <Section index={6} title="単語一覧をみる">
                        <div>ゲーム中に消えた単語一覧をみて勉強しましょう。</div>
                    </Section>
                    <Section index={6} title="もう一度プレイする">
                        <div>もう一度プレイしてみましょう。何度もプレイしてハイスコアを目指しましょう。</div>
                    </Section>
                </div>
            </dialog>
        </RemoveScroll>
    );
};

export default HowToPlayDialog;
