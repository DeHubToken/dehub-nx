import express from 'express';
import { request, verify } from './auth.controller';

export const authRouter = express.Router();

authRouter.route('/request-message').post(request);
authRouter.route('/verify-message').post(verify);
