import { PrismaClient } from "@prisma/client";
import { staffBioDataI } from "../src/interfaces/staff.interface";

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
      select: {
        name: true,
        email: true,
        password: true,
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

export async function createNewTeacherByEmail(
  email: string,
  firstName: string,
  lastName: string
) {
  try {
    const data = await prisma.teachingStaff.create({
      data: {
        email: email,
        profile: {
          create: {
            firstName: firstName,
            lastName: lastName,
          },
        },
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
    console.log(error);
    throw new Error("could not create new teaching staff ");
  }
}

/** 
  @param {number} id
  @param  {staffBioDataI} bioData 
  @returns {Promise<any> | Error}
*/

export async function updateStaffBIO(bioData: any, id: number) {
  try {
    const data = await prisma.profile.update({
      where: {
        id: id,
      },
      data: bioData,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("there was an error updating staff bio");
  }
}

/**
 * @param {number} id
 * @returns {Promise<any>}
 */

export async function deleteUserById(id: number) {
  try {
    const data = await prisma.teachingStaff.delete({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("could not delete the user ");
  }
}

/**
 * @param {number} id
 * @returns {Promise<any>}
 */

export async function getAllStaff() {
  try {
    const data = await prisma.teachingStaff.findMany();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("could not delete the user ");
  }
}

/**
 * @param {string} subjectName
 * @returns {Promise<any> | Error}
 */
export async function createANewSubject(subjectName: string) {
  try {
    const response = await prisma.subject.create({
      data: {
        name: subjectName,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("could not create a new subject ");
  }
}

/**
 * @param {number} id
 * @param {Promise<any>}
 */
export async function deleteSubjectbyID(id: number) {
  try {
    const data = await prisma.subject.delete({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("could not delete the specified subject");
  }
}

/**
 * @param {string} subjectName
 * @returns {Promise<any> | Error}
 */
export async function updateSujectName(subjectName: string, id: number) {
  try {
    const response = await prisma.subject.update({
      where: {
        id: id,
      },
      data: {
        name: subjectName,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("could not update subject name ");
  }
}

/**
 *
 * @returns {Promise<any> | Error}
 */
export async function getAllSubjects() {
  try {
    const response = await prisma.subject.findMany();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("could not update subject name ");
  }
}

/**
 * @param {string} className
 * @returns {Promise<any>}
 */

export async function addANewClass(className: string) {
  try {
    const data = await prisma.class.create({
      data: {
        name: className,
      },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("could not create a new class");
  }
}

/**
 * @returns {Promise<any>}
 */

export async function getAllClasses() {
  try {
    const data = await prisma.class.findMany();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("there was an error viewing all of the classes");
  }
}

export async function removeClassById(id: number) {
  try {
    const data = prisma.class.delete({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("the was an error deleting the class ");
  }
}

/**
 * @param {number} id
 * @returns {Promise<any>}
 */

export async function getClassById(id: number) {
  try {
    const data = await prisma.class.findFirst({
      where: {
        id: id,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("there was an error view the class ");
  }
}

/**
 * @param {number} id
 *
 * @returns {Promise<any>}
 */

export async function updateClassTeacherById(
  classId: number,
  teacherId: number
) {
  try {
    const data = await prisma.class.update({
      where: {
        id: classId,
      },
      data: {
        teacherId: teacherId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("could not ansign the teacher to this class");
  }
}
