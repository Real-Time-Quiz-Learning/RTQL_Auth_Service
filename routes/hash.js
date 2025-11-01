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


    });

export default router;
