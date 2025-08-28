(async () => {
  const res = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext,
    dataToEncryptHash,
    authSig,
  });
  Lit.Actions.setResponse({ response: res })
})();
