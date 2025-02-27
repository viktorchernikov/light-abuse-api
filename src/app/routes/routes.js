import { Router } from "express";
import mainlightController from './mainlight/mainlight.controller.js';

const api = Router()
    .use(mainlightController);

export default Router().use('/api', api);