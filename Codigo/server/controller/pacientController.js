import { listEntity, getEntity, addEntity, updateEntity, deleteEntity, addDefaultTreatments } from '../util/index.js';
const entity = 'pacient';
export async function listPacients() {
    return await listEntity(entity);
}

export async function getPacient(id) {
    return await getEntity(id, entity);
}

export async function createPacient(pacient) {
    const pacientEntity = await addEntity(pacient, entity);
    await addDefaultTreatments(pacientEntity.id);
    return pacientEntity;
}

export async function updatePacient(id, pacient) {
    return await updateEntity(id, pacient, entity);
}

export async function deletePacient(id) {
    return await deleteEntity(id, entity);
}