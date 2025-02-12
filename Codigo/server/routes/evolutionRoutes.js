import { Router } from 'express';
import {
    listEvolution,
    getEvolution,
    createEvolution,
    updateEvolution,
    deleteEvolution,
} from '../controller/evolutionController.js';
import { return500, return200 } from '../util/index.js';

const router = Router();

router.get('/list/:pacientId', async (req, res) => {
    try {
        const response = await listEvolution(req.params.pacientId);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await getEvolution(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.post('/:pacientId', async (req, res) => {
    try {
        const response = await createEvolution(req.params.pacientId, req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const response = await updateEvolution(req.params.id, req.body);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const response = await deleteEvolution(req.params.id);
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

export default router;
