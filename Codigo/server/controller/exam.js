import { query, getEntity, addEntity, updateEntity, deleteEntity } from '../util/index.js';
const entity = 'exam';

export async function listPacientExams(id) {
    return await query(`SELECT * FROM ${entity} WHERE pacient_id = $1 ORDER BY name`, [id]);
}

export async function getExam(id) {
    return await getEntity(id, entity);
}

export async function createExam(pacientId, exam) {
    exam.pacient_id = pacientId;
    return await addEntity(parseExame(exam), entity);
}

export async function updateExam(id, exam) {
    return await updateEntity(id, parseExame(exam), entity);
}

export async function deleteExam(id) {
    return await deleteEntity(id, entity);
}

function parseExame(paciente) {
    return {
        ...paciente,
        results: JSON.stringify(paciente.results)
    };
}