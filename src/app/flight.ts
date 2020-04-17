export class Flight {
    constructor(public flightDuration: number) {
    }

    public startTime: Date;
    public recallTime: Date;

    public get endTime(): Date {
        if (!this.startTime) return null;
        if (this.recallTime) return new Date(+this.recallTime + (+this.recallTime - +this.startTime));
        return new Date(+this.startTime + this.flightDuration * 1000);
    }

    public get remaining(): number {
        return !this.startTime ? this.flightDuration : Math.round((+this.endTime - +new Date()) / 1000);
    }

    public start(remaining?: number): void {
        remaining = remaining || this.flightDuration;
        var start = new Date();
        start.setTime(start.getTime() - 1000 * (this.flightDuration - remaining));
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