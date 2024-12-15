import express from 'express';
import { URLController } from '../controllers/urlController';

export class URLRoutes {
    private readonly router: express.Router;
    private readonly urlController: URLController;

    constructor() {
        this.router = express.Router();
        this.urlController = new URLController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // POST route to shorten URL
        this.router.post('/shorten',
            this.urlController.shortenURL.bind(this.urlController)
        );

        // GET route to redirect short URL
        this.router.get('/:shortCode',
            this.urlController.redirectURL.bind(this.urlController)
        );
    }

    getRouter() {
        return this.router;
    }
}
