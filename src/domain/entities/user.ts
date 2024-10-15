export class User {
    public id: number;
    public email: string;
    public passwordHash: string;

    constructor(email: string, passwordHash: string, id?: number) {
        this.id = id ?? 0;
        this.email = email;
        this.passwordHash = passwordHash;
    }
}
