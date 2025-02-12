import { listEntity, getEntity, addEntity, updateEntity, deleteEntity } from '../util/index.js';
const entity = 'medicine';

export async function listMedications() {
    return await listEntity(entity);
}

export async function getMedication(id) {
    return await getEntity(id, entity);
}

export async function addMedication(medication) {
    return await addEntity(medication, entity);
}

export async function updateMedication(id, medication) {
    return await updateEntity(id, medication, entity);
}

export async function deleteMedication(id) {
    return await deleteEntity(id, entity);
}
