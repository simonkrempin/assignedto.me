import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.DB_URL);

export default pb;
