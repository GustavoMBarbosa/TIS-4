import { Router } from 'express';
import {
    listTreatment,
    getTreatment,
    createTreatment,
    updateTreatment,
    deleteTreatment,
} from '../controller/treatment.js';
import { return500, return200 } from '../util/index.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Treatment
 *   description: API endpoints for managing pacient treatments
 */

/**
 * @swagger
 * /treatment/list/{pacientId}:
 *   get:
 *     summary: List all treatments
 *     description: Returns a list of all treatments of a pacient
 *     tags:
 *       - Treatment
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *       - in: path
 *         name: pacientId
 *         description: ID of the pacient
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of treatments
 */
router.get('/list/:pacientId', async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await listTreatment(req.params.pacientId);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /treatment/{id}:
 *   get:
 *     summary: Get a treatment by ID
 *     description: Returns a treatment by its ID
 *     tags:
 *       - Treatment
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the treatment
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Treatment details
 */
router.get('/:id', async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await getTreatment(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /treatment/{pacientId}:
 *   post:
 *     summary: Create a new treatment
 *     description: Creates a new treatment for a pacient
 *     tags:
 *       - Treatment
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *       - in: path
 *         name: pacientId
 *         description: ID of the pacient
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treatment'
 *     responses:
 *       200:
 *         description: Treatment created
 */
router.post('/:pacientId', async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await createTreatment(req.params.pacientId, req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /treatment/{id}:
 *   put:
 *     summary: Update a treatment by ID
 *     description: Updates a treatment by its ID
 *     tags:
 *       - Treatment
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *       - in: path
 *         name: id
 *         description: ID of the treatment
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treatment'
 *     responses:
 *       200:
 *         description: Treatment updated
 */
router.put('/:id', async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await updateTreatment(req.params.id, req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /treatment/{id}:
 *   delete:
 *     summary: Delete a treatment by ID
 *     description: Deletes a treatment by its ID
 *     tags:
 *       - Treatment
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *       - in: path
 *         name: id
 *         description: ID of the treatment
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Treatment deleted
 */
router.delete('/:id', async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await deleteTreatment(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

export default router;
