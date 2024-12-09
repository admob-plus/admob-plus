import path from "node:path";
import { findWorkspaceDir } from "@pnpm/find-workspace-dir";
import { Window } from "happy-dom";

async function fetchSKAdNetworkItems() {
  const url = "https://developers.google.com/admob/ios/quick-start";
  const res = await fetch(url);
  const { document } = new Window({ url });
  const html = await res.text();
  document.write(html);
  const elm = document.querySelector(
    '#complete-snippet + pre[translate="no"][dir="ltr"]',
  );
  return elm?.textContent?.replace(/^[\s\S]+<key>SKAdNetworkItems<\/key>/, "");
}

export default class Context {
  constructor(
    public readonly rootDir: string,
    public readonly adNetworkItems: string,
  ) {}

  static async create() {
    const [rootDir, adNetworkItems] = await Promise.all([
      findWorkspaceDir("."),
      fetchSKAdNetworkItems(),
    ]);
    if (!rootDir) throw new Error("Cannot find root dir");
    if (!adNetworkItems) throw new Error("Cannot fetch SKAdNetworkItems");

    return new Context(rootDir, adNetworkItems);
  }

  rootDirJoin(...args: string[]) {
    return path.join(this.rootDir, ...args);
  }
}
