import express from 'express';
import { authRouter } from './auth/auth.router';
import { moralisRouter } from './moralis/moralis.router';

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/moralis', moralisRouter);
