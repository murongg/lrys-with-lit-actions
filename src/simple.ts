import { getLitNodeClient } from "./client";
import { decryptData, encryptString } from "./encrypt";

const client = await getLitNodeClient();

// 加密
const { ciphertext, dataToEncryptHash } = await encryptString("Hello World", client);
console.log("Ciphertext:", ciphertext);
console.log("DataToEncryptHash:", dataToEncryptHash);

// 解密
const decrypted = await decryptData(ciphertext, dataToEncryptHash, client);
console.log("Decrypted:", decrypted);
