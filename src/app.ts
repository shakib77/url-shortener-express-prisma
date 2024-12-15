import express from 'express';
import path from 'path';
import { URLRoutes } from './routes/urlRoutes';

export class App {
    private readonly app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.setupViewEngine();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    private initializeRoutes() {
        const urlRoutes = new URLRoutes();
        this.app.use('/', urlRoutes.getRouter());

        // Render home page
        this.app.get('/', (req, res) => {
            res.render('index');
        });
    }

    private setupViewEngine() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'views'));
    }

    getExpressApp() {
        return this.app;
    }
}


