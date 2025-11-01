import express from 'express';
import { ServerStrings } from '../serverstrings.js';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const rh = req.services.restHelper;
        return rh.sendSuccess(res, {
            message: 'validate'
        })
    })
    .post(async (req, res) => {
        const rh            = req.services.restHelper;
        const th            = req.services.tokenHelper;
        const authHeader    = req.headers['authorization'];
        const token         = authHeader && authHeader.split(' ')[1];

        if (token === null) {
            return rh.sendBad(res, {
                message: ServerStrings.NULL_TOKEN
            });
        }

        const vRes = await th.validate(token);
        console.log(vRes);
        return rh.sendSuccess(res, {
            message: ServerStrings.VALIDATION
        });
    });

export default router;
