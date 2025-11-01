import jwt from 'jsonwebtoken';

export class TokenHelper {
    constructor(jwtSecret) {
        this.jwtSecret = jwtSecret;
    } 

    async verify(token) {
        try {
            const decoded = await jwt.verify(token, this.jwtSecret);
        } catch (err) {
            console.log(`JWT decoding error: ${err}`);
        }
    }
}
