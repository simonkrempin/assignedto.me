import PocketBase from "pocketbase";

let pb!: PocketBase;

if (!pb) {
    pb = new PocketBase(process.env.DB_URL);
}

export default pb;
