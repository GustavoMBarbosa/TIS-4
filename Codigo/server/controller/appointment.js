import {
  query,
  getEntity,
  addEntity,
  updateEntity,
  deleteEntity,
} from "../util/index.js";
const entity = "appointment";

export async function listAppointments() {
  return await query(`SELECT a.*,
    json_build_object(
      'id', pacient.id,
      'name', pacient.name
    ) as pacient FROM ${entity} as a LEFT JOIN pacient ON pacient.id = a.pacient_id ORDER BY "startDate"`);
}

export async function getAppointment(id) {
  return await getEntity(id, entity);
}

export async function createAppointment(appointment) {
  return await addEntity(appointment, entity);
}

export async function updateAppointment(id, appointment) {
  return await updateEntity(id, appointment, entity);
}

export async function deleteAppointment(id) {
  return await deleteEntity(id, entity);
}
