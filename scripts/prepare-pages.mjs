import { access, rename, rm } from "node:fs/promises";

const clientRoot = new URL("../dist/client/", import.meta.url);
const prefixedAssets = new URL("getNumberLOTTO/_next/", clientRoot);
const pagesAssets = new URL("_next/", clientRoot);
const emptyPrefixDirectory = new URL("getNumberLOTTO/", clientRoot);

await access(new URL("index.html", clientRoot));
await access(prefixedAssets);
await rm(pagesAssets, { recursive: true, force: true });
await rename(prefixedAssets, pagesAssets);
await rm(emptyPrefixDirectory, { recursive: true, force: true });

console.log("GitHub Pages artifact ready: dist/client/index.html");
