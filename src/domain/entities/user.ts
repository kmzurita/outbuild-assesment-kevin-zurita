export class User {
    private id: number;
    private email: string;
    private passwordHash: string;

    constructor(id: number, email: string, passwordHash: string) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public getId(): number{
        return this.id;
    }

    public getEmail(): string{
        return this.email;
    }

    public getPasswordHash(): string{
        return this.passwordHash;
    }
}
