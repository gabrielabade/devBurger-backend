import express from 'express';
import { resolve } from 'node:path';
import cors from 'cors';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();

    this.app.use(cors());

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    // Remover as rotas estáticas locais, pois agora estamos usando S3
    // this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
    // this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
