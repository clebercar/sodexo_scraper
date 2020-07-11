import { Router } from 'express';

import ScrappersController from '../controllers/ScrappersController';

const scrappersRouter = Router();
const scrappersController = new ScrappersController();

scrappersRouter.post('/', scrappersController.create);

export default scrappersRouter;
