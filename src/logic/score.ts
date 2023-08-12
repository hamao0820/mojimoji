export class Score {
    static score: number;

    private static rensaBonus = [
        0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672,
    ];
    private static pieceBonus = [0, 5, 6, 7, 10, 10];
    private static longestWordBonus = [0, 10, 100, 300, 500];

    static initialize() {
        this.score = 0;
    }

    static addDownScore() {
        this.addScore(1);
    }

    static addErasingScore(rensa: number, piece: number, longestWordLength: number) {
        rensa = Math.min(rensa, this.rensaBonus.length - 1);
        piece = Math.min(piece - 2, this.pieceBonus.length - 1);
        longestWordLength = Math.min(longestWordLength, this.longestWordBonus.length - 1);
        let scale = this.rensaBonus[rensa] + this.pieceBonus[piece] + this.longestWordBonus[longestWordLength];
        if (scale === 0) {
            scale = 1;
        }
        this.addScore(scale * piece * 10);
    }

    static addZenkeshiScore() {
        this.addScore(3600);
    }

    private static addScore(score: number) {
        this.score += score;
    }
}
