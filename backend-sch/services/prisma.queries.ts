import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Finds an admin by email.
 * @param {string} email - The email of the admin to find.
 * @returns {Promise<Admin | null>} - The found admin or null if not found.
 */
export async function findAdmin(email: string) {
  try {
    const admin = await prisma.admin.findFirst({
      where: {
        email: email,
      },
    });
    return admin; // Return null if not found
  } catch (error) {
    console.error("Error retrieving admin:", error); // Log the error for debugging
    throw new Error("Could not retrieve admin");
  }
}

/**
 * Creates a new admin user.
 * @param {string} email - The email of the new admin.
 * @param {string} password - The password of the new admin.
 * @returns {Promise<Admin>} - The created admin object.
 */
export async function createAdmin(email: string, password: string) {
  try {
    const existingAdmin = await findAdmin(email);
    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }

    const newAdmin = await prisma.admin.create({
      data: {
        email: email,
        password: password,
      },
    });
    return newAdmin;
  } catch (error) {
    console.error("Error creating new admin:", error); // Log the error for debugging
    throw new Error(
      "There was an error creating a new admin: could not create data"
    );
  }
}

/**
 * Creates a teaching staff.
 * @param {string} email - The email of the new admin.
 * @returns {Promise<any>} - The created admin object.
 */

export async function createNewTeacherByEmail(email: string) {
  try {
    const data = await prisma.teachingStaff.create({
      data: {
        email: email,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("could not create new teaching staff ");
  }
}

/**
 *
 * @param {number} id
 * @returns {Promise<any>}
 */
export async function getTeacherById(id: number) {
  try {
    const data = await prisma.teachingStaff.findFirst({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error)
    throw new Error("could not create new teaching staff ");
  }
}
