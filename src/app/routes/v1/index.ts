import express, { Router } from 'express';
import passport from 'passport';
import authRoute from './auth.route';
import userRoute from './user.route';

const route: Router = express.Router();

route.use('/auth', authRoute);

route.use('/user', userRoute);

export default route;
