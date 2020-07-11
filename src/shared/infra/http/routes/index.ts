import { Router } from 'express';
import scrappersRouter from '@modules/sodexo/infra/http/routes/scrappers.routes';

const routes = Router();

routes.use('/scrappers', scrappersRouter);

export default routes;
