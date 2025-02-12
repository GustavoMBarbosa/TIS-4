import { Router } from "express";
import {
    listPacients,
    getPacient,
    createPacient,
    updatePacient,
    deletePacient,
} from "../controller/pacientController.js";
import { return500, return200, return403 } from "../util/index.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pacient
 *   description: API endpoints for managing pacients
 */

/**
 * @swagger
 * /pacient:
 *   get:
 *     summary: List all pacients
 *     description: Returns a list of all registered patients
 *     tags:
 *       - Pacient
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of pacients
 */
router.get("/", async (req, res) => {
    try {
        if (!req.user || (req.user.role !== "admin" && req.user.role !== "secretary"))
            return return403(res);

        const response = await listPacients();
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /pacient/{id}:
 *   get:
 *     summary: Get a pacient by ID
 *     description: Returns a patient by their ID
 *     tags:
 *       - Pacient
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the patient to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Patient details
 */
router.get("/:id", async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await getPacient(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /pacient:
 *   post:
 *     summary: Create a new pacient
 *     description: Creates a new patient
 *     tags:
 *       - Pacient
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pacient'
 *     responses:
 *       200:
 *         description: Patient created
 *       500:
 *         description: Error creating patient
 */
router.post("/", async (req, res) => {
    try {
        if (!req.user || (req.user.role !== "admin" && req.user.role !== "secretary"))
            return return403(res);

        const response = await createPacient(req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /pacient/{id}:
 *   put:
 *     summary: Update a pacient by ID
 *     description: Updates a patient by their ID
 *     tags:
 *       - Pacient
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the patient to delete
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pacient'
 *     responses:
 *       200:
 *         description: Patient updated
 *       500:
 *         description: Error updating patient
 */
router.put("/:id", async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await updatePacient(req.params.id, req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

/**
 * @swagger
 * /pacient/{id}:
 *   delete:
 *     summary: Delete a pacient by ID
 *     description: Deletes a patient by their ID
 *     tags:
 *       - Pacient
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the patient to delete
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Patient deleted
 *       500:
 *         description: Error deleting patient
 */
router.delete("/:id", async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") return return403(res);

        const response = await deletePacient(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

export default router;
