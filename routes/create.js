import express from 'express';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get((req, res) => {

    }) 
    .post((req, res) => {

    });

export default router;
