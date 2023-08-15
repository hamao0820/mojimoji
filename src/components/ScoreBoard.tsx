import { FC, useMemo } from 'react';
import { Config } from '../logic/config';
import { scoreBoard } from './ScoreBoard.css';

type ScoreboardProps = {
    score: number;
};

const digitImageWidth = 53;
const digitImageHeight = 67;
// TODO
const digitWidth = (digitImageWidth / digitImageHeight) * Config.fontHeight;

const maxDigits = Math.floor((Config.stageCols * Config.mojiImgWidth) / digitWidth);

export const Scoreboard: FC<ScoreboardProps> = ({ score }) => {
    const digits = useMemo(() => splitIntoDigits(score), [score]);
    return (
        <div className={scoreBoard}>
            {digits.map((digit, i) => (
                <img key={i} src={imagePath(digit)} width={digitWidth} />
            ))}
        </div>
    );
};

function splitIntoDigits(score: number): number[] {
    const digits: number[] = [];

    // スコアを下の桁から埋めていく
    for (let i = 0; i < maxDigits; i++) {
        // 10で割ったあまりを求めて、一番下の桁を取り出す
        const number = score % 10;
        // 一番うしろに追加するのではなく、一番前に追加することで、スコアの並びを数字と同じようにする
        digits.splice(0, 0, number);
        // 10 で割って次の桁の準備をしておく
        score = Math.floor(score / 10);
    }

    return digits;
}

function imagePath(digit: number): string {
    return `img/${digit}.png`;
}
