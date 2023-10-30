import path from 'node:path';

export default class Context {
  constructor(public readonly rootDir: string) {}

  rootDirJoin(...args: string[]) {
    return path.join(this.rootDir, ...args);
  }
}
