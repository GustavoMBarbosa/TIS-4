import { Router } from "express";
import {
  listAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controller/appointment.js";
import { return500, return200, return403 } from "../util/index.js";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "secretary")
    )
      return return403(res);

    const response = await listAppointments();
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "secretary")
    )
      return return403(res);

    const response = await getAppointment(req.params.id);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.post("/", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "secretary")
    )
      return return403(res);

    const response = await createAppointment(req.body);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "secretary")
    )
      return return403(res);

    const response = await updateAppointment(req.params.id, req.body);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "secretary")
    )
      return return403(res);

    const response = await deleteAppointment(req.params.id);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

export default router;
