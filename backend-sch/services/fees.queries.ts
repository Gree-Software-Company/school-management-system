import { QueriesBaseKlass } from "./querieBase";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type feesData = {
  amount: number;
  studentId: number;
  semesterId: number;
};

export async function addNewFees(fees: feesData) {
  try {
    const resp = await prisma.fees.create({
      data: fees,
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("could not add fee");
  }
}

export async function updateFeeById(id: number, feeData: any) {
  try {
    const data = await prisma.fees.update({
      where: {
        id: id,
      },
      data: feeData,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("could not update user fees");
  }
}

export async function getFeeDetail(id: number) {
  try {
    const resp = prisma.fees.findMany({
      where: {
        id: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function getFees() {
  try {
    const resp = prisma.fees.findMany();
    return resp;
  } catch (error) {
    throw new Error("could not get all fees");
  }
}

export async function deleteFees(id: number) {
  try {
    const resp = await prisma.fees.delete({
      where: {
        id: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function updateFees(id: number, fees: feesData) {
  try {
    const resp = await prisma.fees.update({
      where: {
        id: id,
       
      },
      data: fees,
    });
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
}
