import { Router } from "express";
import {
  listPacientExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
} from "../controller/exam.js";
import { return500, return200, return403 } from "../util/index.js";

const router = Router();

router.get("/list/:pacientId", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await listPacientExams(req.params.pacientId);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await getExam(req.params.id);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.post("/:pacientId", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await createExam(req.params.pacientId, req.body);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await updateExam(req.params.id, req.body);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await deleteExam(req.params.id);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

export default router;
