import { Router } from 'express';
import { getWeeklyAppointments, getDailyAppointments, getFirstAppointment, getTotalPacients } from '../controller/homeController.js';
import { return200, return500 } from '../util/index.js';

const router = Router();

router.get('/weekly-appointments', async (req, res) => {
    try {
        // if (!req.user || req.user.role !== "admin" || req.user.role !== "secretary") return return403(res);

        const response = await getWeeklyAppointments();
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.get('/daily-appointments', async (req, res) => {
    try {
        const response = await getDailyAppointments();
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

router.get('/first-appointment', async (req, res) => {
    try {
        // if (!req.user || req.user.role !== "admin" || req.user.role !== "secretary") return return403(res);

        const response = await getFirstAppointment();
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});




router.get('/total-pacients', async (req, res) => {
    try {
        // if (!req.user || req.user.role !== "admin" || req.user.role !== "secretary") return return403(res);

        const response = await getTotalPacients();
        return200(response, res);
    } catch (error) {
        return500(error, req, res);
    }
});

export default router;
