import {execa} from 'execa';

export async function getPodSpec(name: string) {
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
}

export async function checkSDK() {
  const name = 'Google-Mobile-Ads-SDK';
  const spec = await getPodSpec(name);
  return {name, version: spec?.version};
}
