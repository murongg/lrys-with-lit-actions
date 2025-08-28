(async () => {
  const res = await Lit.Actions.encrypt({
    accessControlConditions,
    to_encrypt: new TextEncoder().encode(to_encrypt)
  });
  Lit.Actions.setResponse({
    response: JSON.stringify({
      ciphertext: res.ciphertext,
      dataToEncryptHash: res.dataToEncryptHash,
      to_encrypt
    })
  });
})();

