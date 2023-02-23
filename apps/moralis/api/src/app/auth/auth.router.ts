import express from 'express';
import { authenticate, request, verify } from './auth.controller';

export const authRouter = express.Router();

authRouter.route('/request-message').post(request);
authRouter.route('/verify-message').post(verify);
authRouter.route('/authenticate').post(authenticate);
