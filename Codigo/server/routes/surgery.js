import { Router } from "express";
import {
  listPacientSurgeries,
  getSurgery,
  createSurgery,
  updateSurgery,
  deleteSurgery,
} from "../controller/surgery.js";
import { return500, return200, return403 } from "../util/index.js";

const router = Router();

router.get("/list/:pacientId", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await listPacientSurgeries(req.params.pacientId);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await getSurgery(req.params.id);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.post("/:pacientId", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await createSurgery(req.params.pacientId, req.body);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await updateSurgery(req.params.id, req.body);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return return403(res);

    const response = await deleteSurgery(req.params.id);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

export default router;
