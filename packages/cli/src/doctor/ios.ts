import {execa} from 'execa';

export const getPodSpec = async (name: string) => {
  const p = await execa('pod', ['spec', 'cat', name], {
    reject: false,
  });
  if (p.failed) {
    return null;
  }
  try {
    return JSON.parse(p.stdout) as {version: string};
  } catch {
    // ignore error
  }
  return null;
};
