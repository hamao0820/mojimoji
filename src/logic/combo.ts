export class Combo {
    private static combo: number | null; // 何連鎖かどうか
    private static maxCombo: number | null; // 最大連鎖数
    static initialize(): void {
        this.combo = 0;
        this.maxCombo = 0;
    }

    static getCombo(): number {
        return this.combo ?? 0;
    }

    static getMaxCombo(): number {
        return this.maxCombo ?? 0;
    }

    static addCombo(combo: number): void {
        if (this.combo === null) this.combo = 0;
        if (this.maxCombo === null) this.maxCombo = 0;
        this.combo += combo;
        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }
    }

    static resetCombo(): void {
        this.combo = 0;
    }
}
