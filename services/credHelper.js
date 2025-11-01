import bcrypt from 'bcrypt';

export class CredHelper {
    constructor(dbEnd) {
        this.dbEnd = dbEnd;
    }

    async getCreds() {
    }

    async hashCreds(id, email, password) {
        console.log(id);
        console.log(email);
        console.log(password);

        
    }
}