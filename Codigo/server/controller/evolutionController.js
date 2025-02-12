import { listEntity, getEntity, addEntity, updateEntity, deleteEntity, query } from '../util/index.js';
const entity = 'evolution';

export async function listEvolution(pacientId) {
    return await query(`SELECT * FROM ${entity} WHERE pacient_id = $1 ORDER BY date DESC`, [pacientId]);
}

export async function getEvolution(id) {
    return await getEntity(id, entity);
}

export async function createEvolution(pacientId, evolution) {
    return await addEntity({ ...evolution, pacient_id: pacientId }, entity);
}

export async function updateEvolution(id, evolution) {
    return await updateEntity(id, evolution, entity);
}

export async function deleteEvolution(id) {
    return await deleteEntity(id, entity);
}
