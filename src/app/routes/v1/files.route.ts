import express, { Router } from 'express';
import fileCntroller from 'app/controller/v1/file.controller';

const router: Router = express.Router();

/** Route - Handles Google OAuth 2 Login */
router.post('/create-direcroty', fileCntroller.createDirectory);

export default router;
