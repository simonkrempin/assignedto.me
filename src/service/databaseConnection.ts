import PocketBase from "pocketbase";

const pb = new PocketBase(`${process.env.DB_URL}:8090`);

export default pb;
