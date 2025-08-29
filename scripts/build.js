import { build as esbuild } from "esbuild";
import path from 'node:path'

const encryptFile = path.join(__dirname, "./../actions/encrypt.js");
const decryptFile = path.join(__dirname, "./../actions/decrypt.js");
const uploadFile = path.join(__dirname, "./../actions/upload.js");
const esbuildShims = path.join(__dirname, "./esbuild-shims.js");
const dist = path.join(__dirname, "../dist");

function build(entryFile, outFile, isInjectEthers = false) {
  esbuild({
    entryPoints: [entryFile],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: outFile,
    sourceRoot: "./",
    platform: "node",
    target: "es2020",
    metafile: true,
    inject: isInjectEthers ? [esbuildShims] : [],
    external: [
      "ethers",
    ],
    // treeShaking: true,
  })
}

// build(encryptFile, path.join(dist, "encrypt.js"))
// build(decryptFile, path.join(dist, "decrypt.js"))
build(uploadFile, path.join(dist, "upload.js",), true)
