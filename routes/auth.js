import express from 'express';
import { ServerStrings } from '../serverstrings.js';

const router = express.Router();

router.use(express.json());

router.route('/signup')
    .get((req, res) => {
    })
    .post((req, res) => {
        const data = req.body;      // email, password

        // step 1, validate that their credentials exist in the database
        // step 2, validate 

        res.status(200);
        res.send({ message: 'doing something with all that data ...' });
    });

router.route('/login')
    .get((req, res) => {
        const rh = req.services.restHelper;
        rh.sendSuccss(res, {
            message: 'authorization login endpoint'
        });
    })
    .post((req, res) => {

    });

export default router;
