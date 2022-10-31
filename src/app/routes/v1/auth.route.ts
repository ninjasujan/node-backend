import express, { Router } from 'express';
import passport from 'passport';
import authController from '@controller/v1/auth.controller';

const router: Router = express.Router();

/** Route - Handles Google OAuth 2 Login */
router.get(
    '/google-login',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
);

/** Route - Redirected from callback URL after Google Login */
router.get(
    '/callback',
    passport.authenticate('google', { session: true }),
    authController.googleCallback,
);

router.delete('/logout', authController.authLogout);

export default router;
