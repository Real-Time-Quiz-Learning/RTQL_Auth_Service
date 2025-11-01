import process from 'process';
import express from 'express';
import cors from 'cors';

import { RestHelper } from './services/restHelper.js';
import { TokenHelper } from './services/tokenHelper.js';
import { CredHelper } from './services/credHelper.js';

import hashRouter from './routes/hash.js';
import tokenRouter from './routes/token.js';

class Server {
    constructor() {
        this.port       = process.env.PORT;
        this.dbEnd      = process.env.DB_END;
        this.jwtSecret  = process.env.JWT_SECRET;

        this.root   = process.cwd();
        this.app    = express();

        // Cors policy configuraiton
        this.corsOptions = {
            optionSuccessStatus: 204,
            origin: '*',
            methods: 'GET,POST',
            allowedHeaders: [ 'Content-Type', 'Authorization' ]
        };

        // Services
        this.restHelper     = new RestHelper();
        this.tokenHelper    = new TokenHelper(this.jwtSecret);
        this.credHelper     = new CredHelper(this.dbEnd);

        // Bound middlewares
        this.serviceMiddlewareBound = this.serviceMiddleware.bind(this);
    }

    serviceMiddleware(req, res, next) {
        req.services = Object.freeze({
            restHelper: this.restHelper,
            tokenHelper:    this.tokenHelper,
            credHelper:     this.credHelper
        });
        next();
    }

    start() {
        // Generic middleware
        this.app.use(cors(this.corsOptions));
        this.app.use(express.static(`${this.root}/public`));
        this.app.use(this.serviceMiddlewareBound);

        // Auth routes
        this.app.use('/token', tokenRouter);
        this.app.use('/hash', hashRouter);

        // Testing
        this.app.use('/test', (req, res) => {
            res.status(200);
            res.json({
                message: 'Hello there little friend'
            });
        });

        // Start
        this.app.listen(this.port, () => {
            console.log(`auth service listening on port ${this.port}`);
        });
    }
}

new Server().start();
