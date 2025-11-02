import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ServerStrings } from '../serverstrings.js';

export class ResStatus {
    static SUCCESS = 'SUCCESS';
    static ERROR = 'ERROR';
}

export class AuthRes {
    constructor (status, data = undefined, error = undefined) {
        this.status = status;
        this.data = data;
        this.error = error;
    }
}

export class AuthHelper {
    constructor(dbEnd, tokenHelper) {
        this.dbEnd = dbEnd;
        this.tokenHelper = tokenHelper;
    }

    async checkUser(user) {
        try {
            if (!user.email || !user.pass)
                return new AuthRes(ResStatus.ERROR, undefined, 'missing required parameters.');

            const requestUrl = new URL(`${this.dbEnd}/user`);
            requestUrl.searchParams.append('email', user.email);
            const userDetails = await fetch(requestUrl, {
                method: 'GET',
            });
            const userDetailsParsed = await userDetails.json();

            if (userDetailsParsed.response.status === ResStatus.ERROR)
                return new AuthRes(ResStatus.ERROR, undefined, userDetailsParsed.response.error);

            const compare = await bcrypt.compare(user.pass, userDetailsParsed.response.data[0].pass);

            if (!compare)
                return new AuthRes(ResStatus.ERROR, undefined, 'passwords do not match');

            const token = await this.tokenHelper.sign({
                id: userDetailsParsed.response.data[0].id,
                email: userDetailsParsed.response.data[0].email
            });

            return new AuthRes(ResStatus.SUCCESS, {
                token: token
            });

        } catch (err) {
            console.log(err.message);
            return new AuthRes(ResStatus.ERROR, undefined, 'fatal error checking user');
        }
    }

    async addUser(user) {
        try {
            if (!user.email || !user.fname || !user.lname || !user.pass)
                return new AuthRes(ResStatus.ERROR, undefined, 'missing required parameters.');
            
            const hpass = await bcrypt.hash(user.pass, 10);
            user.pass = hpass;

            const requestUrl = new URL(`${this.dbEnd}/user`);
            const addUserResp = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const addUserParsed = await addUserResp.json();

            if (addUserParsed.response.status === ResStatus.ERROR)
                return new AuthRes(ResStatus.ERROR, undefined, addUserParsed.response.error);

            const token = await this.tokenHelper.sign({
                id: addUserParsed.response.data.insertId,
                email: user.email
            });

            console.log(token);

            return new AuthRes(ResStatus.SUCCESS, {
                token: token
            });

        } catch (err) {
            console.log(err.message);
            return new AuthRes(ResStatus.ERROR, undefined, 'fatal error adding user');
        }
    }
}
