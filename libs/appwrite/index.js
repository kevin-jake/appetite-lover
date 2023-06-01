import { Account, Client, Databases, Functions } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT);

const account = new Account(client);
const database = new Databases(client);
const functions = new Functions(client);

export { account, database, functions };
