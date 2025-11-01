import bcrypt from 'bcrypt';

export class CredHelper {
    constructor(dbEnd) {
        this.dbEnd = dbEnd;
    }

    async getCreds() {
    }

    async hashPassword(password) {
        const hashedPwd = await bcrypt.hash(password, 10);
        return hashedPwd;
    }
}
