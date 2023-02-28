import cors from 'cors';
import express, { Request, Response } from 'express';
import Moralis from 'moralis';
import { apiRouter } from './app/api.router';
import { errorHandler } from './app/middlewares/error.handler';
import { env } from './config';

const app = express();

Moralis.start({
  apiKey: env.MORALIS_WEB3_API_KEY,
  formatEvmAddress: 'lowercase',
  formatEvmChainId: 'decimal',
  logLevel: 'info',
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get('/status/', async (req: Request, res: Response) => {
  const ret = await Promise.resolve(`OK`);
  res.send(ret);
});

app.use('/', apiRouter);
app.use(errorHandler);

app.use(express.static('public'));

app.listen(env.PORT, () => {
  if (env.isDev)
    console.info(
      `⚡️[${env.NAME}]: Server is running at http://localhost:${env.PORT}`
    );
});
