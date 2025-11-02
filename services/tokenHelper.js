import jwt from 'jsonwebtoken';

export class TokenHelper {
    constructor(jwtSecret) {
        this.jwtSecret = jwtSecret;
    } 

    async verify(token) {
        try {
            const decoded = await jwt.verify(token, this.jwtSecret);
            return decoded;
        } catch (err) {
            console.log(`JWT decoding error: ${err}`);
            return false;
        }
    }

    async sign(payload, options = { expiresIn: '1h' }) {
        const token = await jwt.sign(payload, this.jwtSecret, options);
        return token;
    }
}
