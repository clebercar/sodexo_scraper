import { Router } from 'express';

import ScrappersController from '../controllers/ScrappersController';
import createValidator from '../validators/Scrapper/create';

const scrappersRouter = Router();
const scrappersController = new ScrappersController();

scrappersRouter.post('/', createValidator, scrappersController.create);

export default scrappersRouter;
