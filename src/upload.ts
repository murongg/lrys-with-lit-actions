import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import { getAccessControlConditions } from "./client";
import { PRIVATE_KEY } from "./config";

const gatewayAddress = "https://gateway.irys.xyz/";

const getIrysUploader = async () => {
  const irysUploader = await Uploader(Ethereum).withWallet(PRIVATE_KEY);
  return irysUploader;
};

export const uploadToIrys = async (cipherText: string, dataToEncryptHash: string) => {
  const irysUploader = await getIrysUploader();
  const dataToUpload = {
    cipherText: cipherText,
    dataToEncryptHash: dataToEncryptHash,
    accessControlConditions: getAccessControlConditions(),
  };
  const tags = [{ name: "Content-Type", value: "application/json" }];
  const receipt = await irysUploader.upload(JSON.stringify(dataToUpload), { tags });
  return receipt?.id ? `${gatewayAddress}${receipt.id}` : "";
};

export const downloadFromIrys = async (id: string) => {
  const url = `${gatewayAddress}${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const ciphertext = data.cipherText;
  const dataToEncryptHash = data.dataToEncryptHash;
  return [ciphertext, dataToEncryptHash, data.accessControlConditions];
};
