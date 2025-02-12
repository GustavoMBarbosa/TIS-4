import {
    listEntity,
    getEntity,
    addEntity,
    updateEntity,
    deleteEntity,
    query,
} from "../util/index.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const selectFields = 'id, name, email, cpf, role, "bearerToken", address';
const entity = '"user"'

export async function listUsers() {
    return await listEntity(entity, selectFields);
}

export async function getUser(id) {
    let user = await getEntity(id, entity, selectFields);
    delete user.password;
    return user;
}

export async function login(email, password) {
    const user = await checkUser(email, password);
    user.bearerToken = generateToken(user);
    await updateUser(user.id, { ...user });

    return user;
}

export async function loginGoogle(email, password) {
    const user = await checkUserGoogle(email, password);
    user.bearerToken = generateToken(user);
    await updateUser(user.id, { ...user });

    return user;
}

export async function getUserByToken(token) {
    const result = await query(
        `SELECT ${selectFields} FROM ${entity} WHERE "bearerToken" = $1`,
        [token]
    );
    let user = result[0];
    delete user.password;
    return user;
}

export async function getUserByResetToken(token) {
    const result = await query(
        `SELECT ${selectFields} FROM ${entity} WHERE "resetToken" = '${token}'`);
    return result[0];
}

export async function createUser(user) {
    Object.keys(user).forEach(key => {
        if (!user[key]) delete user[key];
    });

    user.password = await encryptPassword(user.password);
    if (!user.name) user.name = user.email;

    let response = await addEntity(user, entity);
    if (!response.bearerToken) {
        response.bearerToken = generateToken(response);
        response = await updateUser(response.id, response);
    }
    delete response.password;
    return response;
}

export async function createUserGoogle(user) {
    Object.keys(user).forEach(key => {
        if (!user[key]) delete user[key];
    });

    user.password = user.password;
    if (!user.name) user.name = user.email;

    let response = await addEntity(user, entity);
    if (!response.bearerToken) {
        response.bearerToken = generateToken(response);
        response = await updateUser(response.id, response);
    }
    delete response.password;
    return response;
}

export async function updateUser(id, user) {
    const result = await updateEntity(id, user, entity);
    delete result.password;
    return result;
}

export async function changePassword(id, user) {
    user.password = await encryptPassword(user.newPassword);
    delete user.newPassword;
    const result = await updateEntity(id, user, entity);
    return result;
}

export async function deleteUser(id) {
    const result = await deleteEntity(id, entity);
    delete result.password;
    return result;
}


export async function generateResetToken(email) {
    const user = await checkEmail(email);

    if (!user) throw new Error("User not found");

    if (user.resetToken && user.resetTokenExpiresAt && new Date(user.resetTokenExpiresAt) > new Date()) {
        return user.resetToken;
    }

    const buffer = new Uint8Array(32);
    crypto.getRandomValues(buffer);
    const token = btoa(String.fromCharCode(...buffer))
        .replace(/[+/]/g, '')
        .slice(0, 32);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 0.5);

    await updateEntity(user.id, { resetToken: token, resetTokenExpiresAt: expiresAt }, entity);

    return token;
}

async function encryptPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function checkUser(email, password) {
    const result = await query(
        `SELECT ${selectFields}, password FROM ${entity} WHERE email = $1`,
        [email]
    );
    const user = result[0];
    if (!user) throw new Error("User not found");

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) throw new Error("Different Pass");
    delete user.password;

    return user;
}

async function checkUserGoogle(email, password) {
    const result = await query(`SELECT ${selectFields} FROM ${entity} WHERE email = $1`, [email]);
    if (!result[0]) throw new Error("User not found");
    if (result[0].password !== password) throw new Error("Different Pass");
    delete result[0].password;

    return result[0];
}

const checkEmail = async (email) => {
    const result = await query(`SELECT ${selectFields} FROM ${entity} WHERE email = $1`, [email]);
    return result[0];
}

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "3h" }
    );
}
