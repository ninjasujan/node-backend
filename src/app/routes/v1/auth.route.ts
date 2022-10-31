import express, { Router } from 'express';
import { body } from 'express-validator';
import passport from 'passport';
import authController from '@controller/v1/auth.controller';
import {
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT,
} from '../../../constants/api.constant';

const router: Router = express.Router();

/** Route - Handles Google OAuth 2 Login */
router.get(
    '/google-login',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
);

/** Route - Redirected from callback URL after Google Login */
router.get(
    '/callback',
    passport.authenticate('google', {
        session: true,
        successRedirect: SUCCESS_REDIRECT,
        failureRedirect: FAILURE_REDIRECT,
    }),
);

router.post(
    '/password-signup',
    [
        body('email', 'Please provide valid email').isEmail(),
        body('name', 'Please provide valid name').isString(),
        body('password', 'Password must be 8 char long')
            .isString()
            .isLength({ min: 8 }),
    ],
    authController.passwordSignup,
);

router.post(
    '/password-login',
    [
        body('email', 'Please provide valid email').isEmail(),
        body('password', 'Password must be 8 char long')
            .isString()
            .isLength({ min: 8 }),
    ],
    authController.passwordLogin,
);

router.delete('/logout', authController.authLogout);

export default router;
