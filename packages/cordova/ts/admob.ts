import { AdMob } from '.'

const admob = new AdMob()

declare global {
  const admob: AdMob
}

export default admob
