import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { GameStage } from './GameStage';
import { MojiMoji } from '../logic/game';
import { Score } from '../logic/score';
import { Stage } from '../logic/stage';
import { Player } from '../logic/player';
import { GameOver } from './GameOver';
import Dictionary from './Dictionary';
import {
    board,
    game,
    showHistoryButton,
    startButton,
    replayButton,
    nextMojiContainer,
    buttonContainer,
    openHowToPlayDialogButton,
} from './Game.css';
import Next from './Next';
import HistoryDialog from './HistoryDialog';
import { GameStatusBoard } from './GameStatusBoard/GameStatusBoard';
import CrossImage from './CrossImage';
import { ZenkeshiImage } from './ZenkeshiImage';
import HowToPlayDialog from './HowToPlayDialog/HowToPlayDialog';

// まずステージを整える
const initialFrame = MojiMoji.initialize();

export const Game: FC = () => {
    const reqIdRef = useRef<number>();
    const [frame, setFrame] = useState(initialFrame); // ゲームの現在フレーム（1/60秒ごとに1追加される）
    const [gameStarted, setGameStarted] = useState(false);
    const [isOpenHistoryDialog, setIsOpenHistoryDialog] = useState(false);
    const [isOpenHowToPlayDialog, setIsOpenHowToPlayDialog] = useState(false);
    const isFirstRender = useRef(true);

    const loop = () => {
        reqIdRef.current = requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
        setFrame((prev) => MojiMoji.tick(prev));
    };

    useEffect(() => {
        if (!gameStarted) return;
        // ゲームを開始する
        loop();
        return () => {
            if (reqIdRef.current !== undefined) {
                cancelAnimationFrame(reqIdRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStarted]);

    useEffect(() => {
        if (gameStarted) return;
        reqIdRef.current = undefined;
        setFrame(MojiMoji.initialize());
        if (isFirstRender.current) return;
        setGameStarted(true);
    }, [gameStarted]);

    const openHistoryDialog = useCallback((): void => {
        setIsOpenHistoryDialog(true);
    }, []);

    const closeHitoryDialog = useCallback((): void => {
        setIsOpenHistoryDialog(false);
    }, []);

    const openHowToPlayDialog = useCallback((): void => {
        setIsOpenHowToPlayDialog(true);
    }, []);

    const closeHowToPlayDialog = useCallback((): void => {
        setIsOpenHowToPlayDialog(false);
    }, []);

    const mojis = [...Stage.getFixedMojis(), ...Stage.getErasingMojis(), ...Player.getPlayingMojis()];
    const zenkeshiAnimationState = Stage.getZenkeshiAnimationState(frame);
    const wordHistory = Player.getWordHistory();
    const erasingWord = Stage.getErasingWord();
    const { next, wNext } = Player.getNextMojis();
    return (
        <div className={game}>
            <button className={openHowToPlayDialogButton} onClick={openHowToPlayDialog}>
                遊び方
            </button>
            <div className={board}>
                {isFirstRender.current ? (
                    <button
                        className={startButton}
                        onClick={() => {
                            setGameStarted(true);
                            if (isFirstRender.current) {
                                isFirstRender.current = false;
                                return;
                            }
                        }}
                    >
                        スタート
                    </button>
                ) : (
                    MojiMoji.mode === 'batankyu' && (
                        <div className={buttonContainer}>
                            <button className={replayButton} onClick={() => setGameStarted(false)}>
                                もう一度
                            </button>
                            <button
                                className={showHistoryButton}
                                onClick={openHistoryDialog}
                                disabled={MojiMoji.mode !== 'batankyu'}
                            >
                                単語一覧
                            </button>
                        </div>
                    )
                )}
                {zenkeshiAnimationState && <ZenkeshiImage {...zenkeshiAnimationState} />}
                <CrossImage />
                <GameStage mojis={mojis} />
                {MojiMoji.mode === 'batankyu' && <GameOver />}
                {!Stage.getWordDictionaryIsHidden() && <Dictionary word={erasingWord ?? ''} />}
                {gameStarted && (
                    <div className={nextMojiContainer}>
                        <Next centerChar={next.center!.char} movableChar={next.movable!.char} isW={false} />
                        <Next centerChar={wNext.center!.char} movableChar={wNext.movable!.char} isW={true} />
                    </div>
                )}
            </div>

            <GameStatusBoard
                score={Score.score}
                time={'0'}
                maxCombo={MojiMoji.maxCombo ?? 0}
                wordsCount={wordHistory.length}
                zenkeshiCount={0}
            />
            <HistoryDialog history={wordHistory} isOpen={isOpenHistoryDialog} onClose={closeHitoryDialog} />
            <HowToPlayDialog isOpen={isOpenHowToPlayDialog} onClose={closeHowToPlayDialog} />
        </div>
    );
};
