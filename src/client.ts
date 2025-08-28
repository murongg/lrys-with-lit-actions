import { ethers } from "ethers";
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { LIT_ABILITY, LIT_NETWORK } from "@lit-protocol/constants";
import { LitActionResource, createSiweMessageWithRecaps, generateAuthSig } from "@lit-protocol/auth-helpers";
import type { AccessControlConditions } from "@lit-protocol/types";
import { IS_DEBUG } from "./config";

let litNodeClientInstance: LitJsSdk.LitNodeClientNodeJs | null = null;
export async function getLitNodeClient() {
  if (litNodeClientInstance) return litNodeClientInstance;
  litNodeClientInstance = new LitJsSdk.LitNodeClientNodeJs({
    alertWhenUnauthorized: false,
    litNetwork: LIT_NETWORK.DatilDev, // testnet
    debug: IS_DEBUG,
  });
  await litNodeClientInstance.connect();
  return litNodeClientInstance;
}

export async function getSessionSigs(client: LitJsSdk.LitNodeClientNodeJs, privateKey: string) {
  const wallet = new ethers.Wallet(privateKey);
  const address = await wallet.getAddress();
  const sessionSigs = await client.getSessionSigs({
    chain: "ethereum",
    resourceAbilityRequests: [
      {
        resource: new LitActionResource("*"),
        ability: LIT_ABILITY.LitActionExecution,
      },
    ],
    authNeededCallback: async (params: any) => {
      const toSign = await createSiweMessageWithRecaps({
        uri: params.uri,
        expiration: params.expiration,
        resources: params.resourceAbilityRequests,
        walletAddress: address,
        nonce: await client.getLatestBlockhash(),
        litNodeClient: client,
      });

      return await generateAuthSig({
        signer: wallet,
        toSign,
      });
    },
  });
  return sessionSigs;
}

export function getAccessControlConditions(): AccessControlConditions {
  return [
    {
      contractAddress: "",
      standardContractType: "",
      chain: "ethereum",
      method: "eth_getBalance",
      parameters: [":userAddress", "latest"],
      returnValueTest: {
        comparator: ">=",
        value: "000000000000000000", // 0 ETH in wei
      },
    },
  ] as AccessControlConditions;
}
