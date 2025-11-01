import express from 'express';
import { ServerStrings } from '../serverstrings.js';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const rh = req.services.restHelper;
        return rh.sendSuccess(res, {
            message: 'We are hasing'
        });
    })
    .post(async (req, res) => {
        const rh = req.services.restHelper;
        const ch = req.services.credHelper;
        const user = req.body;

        if (!user.pass) {
            return rh.sendBad(res, {
                message: ServerStrings.NO_PASSWORD_TO_HASH
            });
        }

        const hashedPwd = await ch.hashPassword(user.pass);
        user['pass'] = hashedPwd;

        rh.sendSuccess(res, {
            message: ServerStrings.HASHED_CREDS,
            response: user
        })
    });

export default router;
