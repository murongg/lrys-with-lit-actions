import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { getAccessControlConditions, getSessionSigs } from "./client";
import fs from "node:fs"
import path from "node:path"
import { PRIVATE_KEY } from "./config";

export const encryptString = async (text: string, litClient: LitJsSdk.LitNodeClientNodeJs) => {
  const accessControlConditions = getAccessControlConditions();
  const code = fs.readFileSync(path.join(__dirname, "../dist/encrypt.js"), "utf-8");
  const sessionSigs = await getSessionSigs(litClient, PRIVATE_KEY);

  const res = await litClient.executeJs({
    code,
    sessionSigs,
    jsParams: {
      accessControlConditions,
      to_encrypt: text,
    }
  });

  if (!res.success) {
    throw new Error("Encrypt failed");
  }

  return JSON.parse(res.response as string) as ReturnType<typeof Lit.Actions.encrypt>;
};

export const decryptData = async (encryptedText: string, dataToEncryptHash: string, litClient: LitJsSdk.LitNodeClientNodeJs) => {
  const code = fs.readFileSync(path.join(__dirname, "../dist/decrypt.js"), "utf-8");
  const sessionSigs = await getSessionSigs(litClient, PRIVATE_KEY);
  const accessControlConditions = getAccessControlConditions();

  const res = await litClient.executeJs({
    code,
    sessionSigs,
    jsParams: {
      accessControlConditions,
      ciphertext: encryptedText,
      dataToEncryptHash,
      authSig: null,
      chain: "ethereum",
    }
  });

  if (!res.success) {
    throw new Error("Decrypt failed");
  }

  return res.response as ReturnType<typeof Lit.Actions.decryptAndCombine>;
};
