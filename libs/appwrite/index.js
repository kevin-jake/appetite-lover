import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT);

const account = new Account(client);
const database = new Databases(client);

export { account, database };
