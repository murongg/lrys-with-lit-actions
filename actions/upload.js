
const { Uploader } = require("@irys/upload");
const { Ethereum } = require("@irys/upload-ethereum");


(async () => {
  const gatewayAddress = "https://gateway.irys.xyz/";

  function getIrysUploader() {
    console.log('process.env.PRIVATE_KEY', PRIVATE_KEY);
    const irysUploader = Uploader(Ethereum).withWallet(PRIVATE_KEY);
    return irysUploader;
  }

  async function uploadToIrys(data) {
    const irysUploader = await getIrysUploader();
    const tags = [{ name: "Content-Type", value: "application/json" }];
    const receipt = await irysUploader.upload(JSON.stringify(data), { tags });
    return receipt?.id ? `${gatewayAddress}${receipt.id}` : ""
  }

  const res = await uploadToIrys({
    dataBase64: "Hello World",
    mime: "text/plain",
  })
  console.log('res', res);
  Lit.Actions.setResponse({
    response: JSON.stringify(res)
  });
})();

