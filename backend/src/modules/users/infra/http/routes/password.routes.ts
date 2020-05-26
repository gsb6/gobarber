import { Router } from 'express';

import ResetPasswordController from '../controllers/ResetPassword';
import ForgotPasswordController from '../controllers/ForgotPassword';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/reset', resetPasswordController.create);
passwordRouter.post('/forgot', forgotPasswordController.create);

export default passwordRouter;
