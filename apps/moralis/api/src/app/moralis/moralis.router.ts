import express from 'express';
import { nativeBalance } from './moralis.controller';

export const moralisRouter = express.Router();

moralisRouter.route('/native-balance').get(nativeBalance);
