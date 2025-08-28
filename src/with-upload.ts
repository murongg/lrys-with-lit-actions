import { getLitNodeClient } from "./client";
import { decryptData, encryptString } from "./encrypt";
import { downloadFromIrys, uploadToIrys } from "./upload";

const client = await getLitNodeClient();

// 1. 加密并上传
const { ciphertext, dataToEncryptHash } = await encryptString("Hello World", client);
console.log("Ciphertext:", ciphertext);
console.log("DataToEncryptHash:", dataToEncryptHash);

const irysUrl = await uploadToIrys(ciphertext, dataToEncryptHash);
console.log("Irys URL:", irysUrl);


// 2. 下载并解密
const id = irysUrl.split("/").pop()
if (!id) {
  throw new Error("Invalid Irys URL");
}
const [downloadedCiphertext, downloadedHash] = await downloadFromIrys(id);
const decrypted = await decryptData(downloadedCiphertext, downloadedHash, client);
console.log("Decrypted:", decrypted);
