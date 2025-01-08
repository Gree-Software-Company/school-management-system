import { QueriesBaseKlass } from "./querieBase";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addAttendanceStaff(id: number) {
  try {
    const resp = await prisma.attendace.create({
      data: {
        staffId: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("cannot add attendace for staff");
  }
}
export async function addAttendanceStudent(id: number) {
  try {
    const resp = await prisma.attendace.create({
      data: {
        studentId: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("cannot add attendace for student");
  }
}
export async function getAllAttendaceData() {
  try {
    const resp = await prisma.attendace.findMany();
    return resp;
  } catch (err) {
    console.log(err);
    throw new Error("cannot get all attendace data");
  }
}

export async function getOneAttendance(id: number) {
  try {
    const resp = await prisma.attendace.findFirst({
      where: {
        id: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("could not fetch attendace");
  }
}

export async function deleteAttendace(id: number) {
  try {
    const data = await prisma.attendace.delete({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("could not delete attendance");
  }
}
export async function updateAttendace(id: number, updateData: any) {
  try {
    const data = await prisma.attendace.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("could not update attendance");
  }
}
