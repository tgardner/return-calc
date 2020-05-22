export class Flight {
    constructor(public duration: number) {
    }

    public startTime: Date;
    public recallTime: Date;

    public get endTime(): Date {
        if (!this.startTime) { return null; }
        if (this.recallTime) { return new Date(+this.recallTime + (+this.recallTime - +this.startTime)); }
        return new Date(+this.startTime + this.duration * 1000);
    }

    public get remaining(): number {
        return !this.startTime ? this.duration : Math.round((+this.endTime - +new Date()) / 1000);
    }

    public start(remaining?: number): void {
        remaining = remaining || this.duration;
        const start = new Date();
        start.setTime(start.getTime() - 1000 * (this.duration - remaining));
        this.startTime = start;
    }

    public recall(): void {
        this.recallTime = new Date();
    }

    public stop(): void {
        this.startTime = null;
        this.recallTime = null;
    }
}
