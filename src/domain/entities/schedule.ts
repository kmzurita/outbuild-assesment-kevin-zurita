export class Schedule {
    private id: number;
    private name: string;
    private imageUrl: string;
    private userId: number;

    constructor(name: string, imageUrl: string, id?: number, userId?: number) {
        this.id = id ?? 0;
        this.name = name;
        this.imageUrl = imageUrl;
        this.userId = userId ?? 0;
    }

    public getName(): string{
        return this.name;
    }

    public getImageUrl(): string{
        return this.imageUrl;
    }

    public getId(): number{
        return this.id;
    }

    public getUserId(): number{
        return this.userId;
    }
}
