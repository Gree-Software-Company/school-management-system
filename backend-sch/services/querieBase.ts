import { PrismaClient } from "@prisma/client";

export class QueriesBaseKlass {
  /* 
    *QueriesBaseKlass Provides an interface for querying the database.
    *This sets up a prisma obj that can be used to query the database.
  */
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
}
