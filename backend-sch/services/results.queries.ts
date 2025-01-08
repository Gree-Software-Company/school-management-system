import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type GradeType = {
  score: number;
  studentId: number;
  subjectId: number;
  semesterId: number;
};

export async function createAGrade(gradeData: GradeType) {
  try {
    const responseData = await prisma.marks.create({
      data: {
        score: gradeData.score,
        studentId: gradeData.studentId,
        semesterId: gradeData.semesterId,
        subjectId: gradeData.subjectId,
      },
    });
    return responseData;
  } catch (error) {
    console.log(error);
    throw new Error("could not add grade");
  }
}

export async function getAllGrades() {
  try {
    const responseData = await prisma.marks.findMany({
      include: {
        semester: {
          select: {
            name: true,
            academicYear: true,
          },
        },
      },
    });
    return responseData;
  } catch (error) {
    console.log(error);
    throw new Error("could get all grades");
  }
}

export async function updateGradeById(id: number, gradeData: GradeType) {
  try {
    const responseData = await prisma.marks.update({
      where: {
        id: id,
      },
      data: {
        score: gradeData.score,
        studentId: gradeData.studentId,
        semesterId: gradeData.semesterId,
        subjectId: gradeData.subjectId,
      },
    });
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function getGradesById(id: number) {
  try {
    const resp = await prisma.marks.findFirst({
      where: {
        id: id,
      },
      include: {
        semester: true,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
    throw new Error("could not run get grades by id");
  }
}

export async function deleteGradeById(id: number) {
  try {
    const responseData = await prisma.marks.delete({
      where: {
        id: id,
      },
    });
    return responseData;
  } catch (error) {
    console.log(error);
    throw new Error("could not delete grade");
  }
}
