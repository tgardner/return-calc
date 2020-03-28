export class Flight {
    constructor();
    constructor(flightTime: number)
    constructor(flightTime?: number) {
        this.flightTime = flightTime || 0;
    }
    public flightTime: number;
    public endTime: Date;

    public get remaining(): number {
        if (!this.endTime) return this.flightTime;

        var now = new Date();
        return Math.round((+this.endTime - +now) / 1000);
    }

    public start(remaining?: number): void {
        remaining = remaining || this.flightTime;
        this.endTime = new Date();
        this.endTime.setTime(this.endTime.getTime() + remaining * 1000);
    }

    public recall(): void {
        var endTime = new Date();
        endTime.setTime(endTime.getTime() + (this.flightTime - this.remaining) * 1000);
        this.endTime = endTime;
    }

    public stop(): void {
        this.endTime = null;
    }
}