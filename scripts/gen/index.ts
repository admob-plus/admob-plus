import fs from "node:fs/promises";
import path from "node:path";
import CapacitorGen from "./capacitor";
import ConsentGen from "./consent";
import Context from "./context";
import CordovaGen from "./cordova";
import DocsGen from "./docs";

async function main() {
	const ctx = await Context.create();

	for (const Generator of [CapacitorGen, ConsentGen, CordovaGen, DocsGen]) {
		const g = new Generator(ctx);
		for (const [k, v] of Object.entries(await g.files())) {
			console.log(path.relative(ctx.rootDir, k));
			await fs.writeFile(k, v);
		}
	}
}

main();
