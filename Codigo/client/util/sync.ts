import { getAllFromDB, updateInDB, deleteFromDB } from "~/database";
import { useUser } from "~/composables/useUser";
import { usePacients } from "~/composables/usePacients";
import type User from "~/types/User";
import type Pacient from "~/types/Pacient";

export default async function syncChanges() {
  await syncUsers();
  await syncPacients();
}

async function syncUsers() {
  const { updateUser, createUser, deleteUser } = useUser();

  // Sync users
  const users = await getAllFromDB<User>("users");
  for (const user of users) {
    if (user._status === "deleted") {
      try {
        await deleteUser(user.id);
        await deleteFromDB("users", user.id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else if (user._status === "new") {
      try {
        const newUser = await createUser(user);
        await updateInDB("users", user.id, { ...newUser, _status: "synced" });
      } catch (error) {
        console.error("Error creating user:", error);
      }
    } else if (user._status === "modified") {
      try {
        await updateUser(user);
        await updateInDB("users", user.id, { ...user, _status: "synced" });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  }
}

async function syncPacients() {
  const { updatePacient, createPacient, deletePacient } = usePacients();

  // Sync patients
  const patients = await getAllFromDB<Pacient>("pacients");
  for (const patient of patients) {
    if (patient._status === "deleted") {
      try {
        await deletePacient(patient.id);
        await deleteFromDB("pacients", patient.id);
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    } else if (patient._status === "new") {
      try {
        const newPatient = await createPacient(patient);
        await updateInDB("pacients", patient.id, { ...newPatient, _status: "synced" });
      } catch (error) {
        console.error("Error creating patient:", error);
      }
    } else if (patient._status === "modified") {
      try {
        await updatePacient(patient);
        await updateInDB("pacients", patient.id, { ...patient, _status: "synced" });
      } catch (error) {
        console.error("Error updating patient:", error);
      }
    }
  }
}
