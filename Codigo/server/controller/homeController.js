import { query } from '../util/index.js';

export async function getWeeklyAppointments() {
    return await query(`
        SELECT COUNT(*)
        FROM appointment a
        WHERE (
            (a."startDate" >= date_trunc('week', current_date)
            AND "startDate" < date_trunc('week', current_date) + interval '1 week'
            OR a.frequency = 'WEEKLY')
            AND (
                a."canceledAppointmentDates" IS NULL
                OR NOT EXISTS (
                    SELECT 1
                    FROM unnest(string_to_array(trim(both '{}' from a."canceledAppointmentDates"), ',')) AS canceled_date
                    WHERE (canceled_date::timestamptz) >= date_trunc('week', current_date)
                    AND (canceled_date::timestamptz) < date_trunc('week', current_date) + interval '1 week'
                )
            )
        )
    `);
}

export async function getDailyAppointments() {
    return await query(`
        SELECT COUNT(*)
        FROM appointment a
        WHERE (
            (a."startDate" >= date_trunc('day', current_date)
            AND "startDate" < date_trunc('day', current_date) + interval '1 day')
            AND (
                a."canceledAppointmentDates" IS NULL
                OR NOT EXISTS (
                    SELECT 1
                    FROM unnest(string_to_array(trim(both '{}' from a."canceledAppointmentDates"), ',')) AS canceled_date
                    WHERE (canceled_date::timestamptz) >= date_trunc('day', current_date)
                    AND (canceled_date::timestamptz) < date_trunc('day', current_date) + interval '1 day'
                )
            )
        )
    `);
}

export async function getFirstAppointment() {
    return await query(`
        SELECT "startDate" FROM appointment a 
        WHERE "startDate" >= date_trunc('day', current_date)
        AND "startDate" < date_trunc('day', current_date) + interval '1 day' 
        ORDER BY "startDate" ASC
        LIMIT 6
    `);
}

export async function getTotalPacients() {
    return await query(`
        SELECT COUNT(*) FROM pacient p 
    `);
}
