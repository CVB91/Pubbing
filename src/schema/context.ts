import { PrismaClient } from "../prisma";



 interface Context {
  uid: string | null;
  prisma: PrismaClient;

}

interface AuthorizedContext extends Context {
  uid: string;
}
export type {AuthorizedContext, Context}