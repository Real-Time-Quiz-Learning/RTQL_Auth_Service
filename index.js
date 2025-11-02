import process from 'process';
import express from 'express';
import cors from 'cors';

import { RestHelper } from './services/restHelper.js';
import { TokenHelper } from './services/tokenHelper.js';
import { AuthHelper } from './services/authHelper.js';

import hashRouter from './routes/hash.js';
import tokenRouter from './routes/token.js';
import authRouter from './routes/auth.js';

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
        this.authHelper     = new AuthHelper(this.dbEnd, this.tokenHelper);

        // Bound middlewares
        this.serviceMiddlewareBound = this.serviceMiddleware.bind(this);
    }

    serviceMiddleware(req, res, next) {
        req.services = Object.freeze({
            restHelper: this.restHelper,
            tokenHelper:    this.tokenHelper,
            authHelper:     this.authHelper
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
        this.app.use('/auth', authRouter);

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
