import { PrismaClient } from "../prisma";



export interface Context {
  uid: string | null;
  primsa: PrismaClient;

}

export interface AuthorizedContext extends Context {
  uid: string;
}