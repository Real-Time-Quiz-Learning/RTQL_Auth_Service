import express, { json } from 'express';
import { ServerStrings } from '../serverstrings.js';

const router = express.Router();

router.use(express.json());

router.route('/signup')
    .post(async (req, res) => {
        const rh = req.services.restHelper;
        const ah = req.services.authHelper;
        // const th = req.services.tokenHelper;
        const user = req.body;

        const addUserResp = await ah.addUser(user);

        console.log(addUserResp);

        rh.sendAuth(res, addUserResp, {
            message: ServerStrings.SIGNUP_REQUEST
        });
    });

router.route('/login')
    .post(async (req, res) => {
        const rh = req.services.restHelper;
        const ah = req.services.authHelper;
        const user = req.body;

        const checkUserResp = await ah.checkUser(user);

        rh.sendAuth(res, checkUserResp, {
            message: ServerStrings.LOGIN_REQUEST
        })
    });

export default router;
