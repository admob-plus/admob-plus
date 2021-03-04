import { Button } from '@chakra-ui/react'
import * as React from 'react'

export interface RewardInterstitialAdProps {}

const RewardedInterstitialAd: React.FC<RewardInterstitialAdProps> = () => {
  const rewarded = React.useMemo(
    () =>
      new admob.RewardedInterstitialAd({
        adUnitId: 'ca-app-pub-3940256099942544/6978759866',
      }),
    [],
  )

  return (
    <div>
      <Button
        onClick={() => {
          rewarded.load()
        }}
      >
        load
      </Button>
      <Button
        onClick={() => {
          rewarded.show()
        }}
      >
        show
      </Button>
    </div>
  )
}

export default RewardedInterstitialAd
