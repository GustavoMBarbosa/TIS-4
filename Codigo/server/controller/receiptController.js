import {
  listEntity,
  getEntity,
  addEntity,
  updateEntity,
  deleteEntity,
  query,
} from "../util/index.js";

const entity = "receipt";

export async function listReceipts() {
  return await listEntity(entity, period);
}

export async function listReceiptsWithJoin(period = []) {
  const where = period.length ? "WHERE date BETWEEN $1 AND $2" : "";
  const whereSub = period.length ? "AND sub1.date BETWEEN $1 AND $2" : "";

  const data = await query(
    `
        SELECT 
            updated_at_month + INTERVAL '1 month' - INTERVAL '1 day' AS date,
            SUM(total) AS total,
            COALESCE(ARRAY(
                SELECT 
                    json_build_object(
                        'id', sub1.id,
                        'value', sub1.value,
                        'date', sub1.date,
                        'pacient_id', sub1.pacient_id,
                        'pacient', pacient 
                    ) 
                FROM receipt AS sub1
                INNER JOIN pacient ON pacient.id = sub1.pacient_id
                WHERE DATE_TRUNC('month', sub1.date) = updated_at_month ${whereSub}
            ), ARRAY[]::json[]) AS childs
        FROM(
            SELECT 
                DATE_TRUNC('month', t1.date) updated_at_month,
                SUM(value) AS total
            FROM receipt as t1
            ${where}    
            GROUP BY DATE_TRUNC('month', t1.date)
        )
        GROUP BY updated_at_month;
    `,
    period
  );
  return data;
}

export async function getReceipt(id) {
  return await getEntity(id, entity);
}

export async function createReceipt(receipt) {
  try {
    return await addEntity(receipt, entity);
  } catch (error) {
    console.log("Error on creating a new receipt: " + error);
  }
}

export async function updateReceipt(id, receipt) {
  return await updateEntity(id, receipt, entity);
}

export async function deleteReceipt(id) {
  return await deleteEntity(id, entity);
}
