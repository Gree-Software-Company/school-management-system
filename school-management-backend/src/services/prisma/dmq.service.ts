import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(
  email: string,
  password: string,
  phone: string,
  name: string
) {
  try {
    const data = await prisma.admin.create({
      data: {
        email: email,
        password: password,
        name: name,
        phone: phone,
      },
    });
  } catch (error) {
    throw new Error("Could not create new user");
  }
}

export async function findUserByEmail(email:string) {
  try {
      const data = await prisma.admin.findUnique({
        where: {
          email:email
        }
      })
      return data
  } catch (error) {
    throw new Error(error)
  }
  
}

