import { build as esbuild } from "esbuild";
import path from 'node:path'

const encryptFile = path.join(__dirname, "./../actions/encrypt.js");
const decryptFile = path.join(__dirname, "./../actions/decrypt.js");
const esbuildShims = path.join(__dirname, "./esbuild-shims.js");
const dist = path.join(__dirname, "../dist");

function build(entryFile, outFile, isInjectEthers = false) {
  esbuild({
    entryPoints: [entryFile],
    bundle: true,
    minify: false,
    sourcemap: false,
    outfile: outFile,
    sourceRoot: "./",
    platform: "node",
    metafile: true,
    inject: isInjectEthers ? [esbuildShims] : [],
  })
}

build(encryptFile, path.join(dist, "encrypt.js"))
build(decryptFile, path.join(dist, "decrypt.js"))
