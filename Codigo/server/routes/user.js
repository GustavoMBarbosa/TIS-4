import { Router } from "express";
import {
    listUsers,
    getUser,
    getUserByToken,
    createUser,
    updateUser,
    deleteUser,
} from "../controller/user.js";
import { return500, return200, return403 } from "../util/index.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get all users
 *     description: Retrives a list of all users
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await listUsers();
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a user by their ID
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
 *         description: ID of the user to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User details
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
    try {
        if (!req.user || (req.user.role !== "admin" && req.user.id != req.params.id))
            return return403(res);
        const response = await getUser(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /user/token/{token}:
 *   get:
 *     summary: Get a user by token
 *     description: Retrieves a user by their token
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *       - name: token
 *         in: path
 *         description: Token of the user to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User details
 *       500:
 *         description: Internal server error
 */
router.get("/token/:token", async (req, res) => {
    try {
        if (!req.user || (req.user.role !== "admin" && req.user.id != req.params.id))
            return return403(res);
        const response = await getUserByToken(req.params.token);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.post("/", async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await createUser(req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates a user by their ID
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
 *         description: ID of the user to update
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User updated
 *       500:
 *         description: Error updating user
 */
router.put("/:id", async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin" || req.user.id != req.params.id)
            return return403(res);

        const response = await updateUser(req.params.id, req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.put("/change-password/:id", async (req, res) => {
    try {
        const response = await changePassword(req.params.id, req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user by their ID
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
 *         description: ID of the user to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       500:
 *         description: Error deleting user
 */
router.delete("/:id", async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await deleteUser(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

export default router;
