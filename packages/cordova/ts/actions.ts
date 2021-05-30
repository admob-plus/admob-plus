import { MobileAd } from './api'
import { execAsync, NativeActions } from './generated'

export async function createAd<
  Ad extends MobileAd,
  O = ConstructorParameters<typeof Ad>[0],
>(
  cls: { new (opts: O): Ad; type: string },
  opts: O,
): Promise<InstanceType<typeof MobileAd>> {
  const Ad = cls
  if (Ad.type === '') {
    throw new Error('Not implemented')
  }
  const ad = new Ad({ ...opts, _noinit: true })
  await execAsync(NativeActions.adCreate, [
    { ...opts, id: ad.id, type: Ad.type },
  ])
  return ad
}
