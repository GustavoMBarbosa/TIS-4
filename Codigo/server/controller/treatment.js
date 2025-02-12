import { listEntity, getEntity, addEntity, updateEntity, deleteEntity, query } from '../util/index.js';
const entity = 'treatment';

export async function listTreatment(pacientId) {
    return await query(`SELECT * FROM ${entity} WHERE pacient_id = $1`, [pacientId]);
}

export async function getTreatment(id) {
    return await getEntity(id, entity);
}

export async function createTreatment(pacientId, treatment) {

    return await addEntity({ ...treatment, pacient_id: pacientId }, entity);
}

export async function updateTreatment(id, treatment) {
    return await updateEntity(id, treatment, entity);
}

export async function deleteTreatment(id) {
    return await deleteEntity(id, entity);
}
