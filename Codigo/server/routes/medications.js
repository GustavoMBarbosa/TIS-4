import { Router } from 'express';
import {
    listMedications,
    getMedication,
    addMedication,
    updateMedication,
    deleteMedication
} from '../controller/medicationsController.js';
import { return200, return500, return403 } from '../util/index.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        if (req.user.role !== "admin") return return403(res);

        const response = await listMedications();
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (req.user.role !== "admin") return return403(res);

        const response = await getMedication(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.post('/', async (req, res) => {
    try {
        if (req.user.role !== "admin") return return403(res);

        const response = await addMedication(req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (req.user.role !== "admin") return return403(res);

        const response = await updateMedication(req.params.id, req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (req.user.role !== "admin") return return403(res);

        const response = await deleteMedication(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

export default router;
