import express from 'express';
import { ServerStrings } from '../serverstrings.js';

const router = express.Router();

router.use(express.json());

router.route('/validate')
    .get(async (req, res) => {
        const rh            = req.services.restHelper;
        const th            = req.services.tokenHelper;
        const authHeader    = req.headers['authorization'];
        const token         = authHeader && authHeader.split(' ')[1];

        if (token === null)
            return rh.sendBad(res, {
                message: ServerStrings.NULL_TOKEN
            });

        const vRes = await th.verify(token);
        if (!vRes)
            return rh.sendBad(res, {
                message: ServerStrings.VALIDATION_FAILED
            });

        return rh.sendSuccess(res, {
            message: ServerStrings.VALIDATION,
            response: vRes
        });
    });

export default router;