import express, { Router } from 'express';
import passport from 'passport';
import authRoute from './auth.route';
import userRoute from './user.route';
import fileRoute from './files.route';

const route: Router = express.Router();

route.use('/auth', authRoute);

route.use('/user', userRoute);

route.use('/file', fileRoute);

export default route;
