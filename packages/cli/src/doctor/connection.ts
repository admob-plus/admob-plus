import got from 'got';

export const adServerHost = 'googleads.g.doubleclick.net';

export async function connectAdServer() {
  await got(`https://${adServerHost}`);
}
