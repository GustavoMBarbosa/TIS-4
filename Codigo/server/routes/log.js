import { Router } from 'express';
import { createUser, login, changePassword, generateResetToken, getUserByResetToken } from '../controller/user.js';
import { return500, return200, return403 } from '../util/index.js';
import { sendEmail } from '../services/mailer.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        req.body.role = 'basic';
        const response = await createUser(req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.post('/login', async (req, res) => {
    try {
        const response = await login(req.body.email, req.body.password);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /user/change-password/{id}:
 *   put:
 *     summary: Change password of a user by ID
 *     description: Changes the password of a user by their ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *       - name: id
 *         in: path
 *         description: ID of the user to change password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Password changed
 *       500:
 *         description: Error changing password
 */
router.put('/reset-password', async (req, res) => {
    try {
        const { password, token } = req.body
        const user = await getUserByResetToken(token)
        if (!user) return return403('Token inválido', res)
        user.newPassword = password;

        const response = await changePassword(user.id, user);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.post('/generate-reset-token', async (req, res) => {
    try {
        const response = await generateResetToken(req.body.email);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.post('/send-email', async (req, res) => {
    try {
        const response = await sendEmail(req.body.to, req.body.key);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

export default router;
