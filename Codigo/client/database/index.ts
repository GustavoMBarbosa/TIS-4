// import { openDB, DBSchema } from 'idb';
// import { User } from '../types/User';
// import { Pacient } from '../types/Pacient';

// interface MyDB extends DBSchema {
//   users: {
//     key: string;
//     value: User;
//   };
//   patients: {
//     key: string;
//     value: Pacient;
//   };
//   // Add other entities as needed
// }

const dbPromise = {} as any;

export async function getFromDB<T>(storeName: string, id: string): Promise<T | undefined> {
  return (await dbPromise).get(storeName, id);
}

export async function addToDB<T>(storeName: string, item: T): Promise<string> {
  return (await dbPromise).add(storeName, item);
}

export async function updateInDB<T>(storeName: string, id: string, item: T): Promise<string> {
  let data = await getFromDB<T>(storeName, id);
  data = { ...data, ...item };  

  return (await dbPromise).put(storeName, data);
}

export async function deleteFromDB(storeName: string, id: string): Promise<void> {
  return (await dbPromise).delete(storeName, id);
}

export async function getAllFromDB<T>(storeName: string): Promise<T[]> {
  return (await dbPromise).getAll(storeName);
}