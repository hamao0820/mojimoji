export class AudioManager {
    private static readyAudio: HTMLAudioElement | null;
    private static fixAudio: HTMLAudioElement | null;
    private static eraseAudio: HTMLAudioElement | null;
    private static zenkeshiAudio: HTMLAudioElement | null;
    private static gameOverAudio: HTMLAudioElement | null;
    private static bgmAudio: HTMLAudioElement | null;

    static initialize() {
        this.readyAudio = new Audio('sound/Countdown03-1.mp3');
        this.fixAudio = new Audio('sound/Motion-Pop11-1.mp3');
        this.eraseAudio = new Audio('sound/Motion-Pop05-1.mp3');
        this.gameOverAudio = new Audio('sound/Onoma-Negative07-3(Low-Long).mp3');
        this.zenkeshiAudio = new Audio('sound/Onoma-Flash10-4(High-2).mp3');

        this.bgmAudio ??= new Audio('sound/husigityan o-ra.mp3');
    }

    static playReady() {
        if (!this.readyAudio) this.readyAudio = new Audio('sound/Countdown03-1.mp3');
        this.readyAudio.currentTime = 0;
        this.readyAudio.play();
    }

    static playFix() {
        if (!this.fixAudio) this.fixAudio = new Audio('sound/Motion-Pop11-1.mp3');
        this.fixAudio.currentTime = 0;
        this.fixAudio.play();
    }

    static playErase() {
        if (!this.eraseAudio) this.eraseAudio = new Audio('sound/Motion-Pop05-1.mp3');
        this.eraseAudio.currentTime = 0;
        this.eraseAudio.play();
    }

    static playZenkeshi() {
        if (!this.zenkeshiAudio) this.zenkeshiAudio = new Audio('sound/Onoma-Flash10-4(High-2).mp3');
        this.zenkeshiAudio.currentTime = 0;
        this.zenkeshiAudio.play();
    }

    static playGameOver() {
        if (!this.gameOverAudio) this.gameOverAudio = new Audio('sound/Onoma-Negative07-3(Low-Long).mp3');
        this.gameOverAudio.currentTime = 0;
        this.gameOverAudio.play();
    }

    static playBGM() {
        if (!this.bgmAudio) this.bgmAudio = new Audio('sound/husigityan o-ra.mp3');
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 0.1;
        this.bgmAudio.play();
    }
}
