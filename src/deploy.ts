import { getLitNodeClient, getSessionSigs } from "./client";
import path from "node:path"
import fs from "node:fs"
import { PRIVATE_KEY } from "./config";

async function deploy() {
  const client = await getLitNodeClient();
  const code = fs.readFileSync(path.join(__dirname, "../dist/upload.js"), "utf-8");
  const sessionSigs = await getSessionSigs(client, PRIVATE_KEY);

  const res = await client.executeJs({
    code,
    sessionSigs,
    jsParams: {
      PRIVATE_KEY
    }
  });
  console.log('res', res);
}

deploy();
