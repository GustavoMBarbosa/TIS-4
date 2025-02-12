import { query, getEntity, addEntity, updateEntity, deleteEntity } from '../util/index.js';
const entity = 'surgery';

export async function listPacientSurgeries(id) {
    return await query(`SELECT * FROM ${entity} WHERE pacient_id = $1 ORDER BY date`, [id]);
}

export async function getSurgery(id) {
    return await getEntity(id, entity);
}

export async function createSurgery(pacientId, surgery) {
    surgery.pacient_id = pacientId;
    return await addEntity(surgery, entity);
}

export async function updateSurgery(id, surgery) {
    return await updateEntity(id, surgery, entity);
}

export async function deleteSurgery(id) {
    return await deleteEntity(id, entity);
}