import {execa} from 'execa';

export const collectDependencies = async ({cwd}: {cwd: string}) => {
  const p = await execa('./gradlew', ['androidDependencies'], {
    cwd,
    reject: false,
  });
  if (p.failed) {
    return null;
  }
  const r: {[k: string]: Set<string>} = {};
  const matches = p.stdout.matchAll(/--- (\S+):(\d+\.\d+\.\d+)@/g);
  for (const m of matches) {
    if (!r[m[1]]) {
      r[m[1]] = new Set();
    }
    r[m[1]].add(m[2]);
  }
  return r;
};
