export class Flight {
    constructor(public flightTime: number) {
    }

    public endTime: Date;

    public get remaining(): number {
        if (!this.endTime) return this.flightTime;

        var now = new Date();
        return Math.round((+this.endTime - +now) / 1000);
    }

    public start(): void {
        this.endTime = new Date();
        this.endTime.setTime(this.endTime.getTime() + this.flightTime * 1000);
    }
}