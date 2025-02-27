import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import routes from './app/routes/routes.js';
import Devboard from './app/services/devboard/devboard.js';
import dotenv from 'dotenv'

dotenv.config({
    path: import.meta.dirname + '/../.env'
});

const app = express();
const port = parseInt(process.env.SERVER_PORT || 3450);

const devboard = new Devboard();
await devboard.connect();

app.locals.devboard = devboard;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);


app.listen(port, () => {
    console.info(`Server: Listening to port ${port}`)
});