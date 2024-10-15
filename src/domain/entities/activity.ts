export class Activity {
    private id: number;
    private name: string;
    private startDate: Date;
    private endDate: Date;
    private scheduleId: number;

    constructor(id: number, name: string, startDate: Date, endDate: Date, scheduleId: number) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.scheduleId = scheduleId
    }

    public getId(): number{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public getStartDate(): Date{
        return this.startDate;
    }

    public getEndDate(): Date{
        return this.endDate;
    }

    public getScheduleId(){
        return this.scheduleId;
    }
}