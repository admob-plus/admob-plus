import { Button } from '@chakra-ui/react'
import * as React from 'react'

export interface InterstitialProps {}

const InterstitialAd: React.FC<InterstitialProps> = () => {
  const interstitial = React.useMemo(
    () =>
      new admob.InterstitialAd({
        adUnitId: 'ca-app-pub-3940256099942544/1033173712',
      }),
    [],
  )

  return (
    <div>
      <Button
        onClick={() => {
          interstitial.load()
        }}
      >
        load
      </Button>
      <Button
        onClick={() => {
          interstitial.show()
        }}
      >
        show
      </Button>
    </div>
  )
}

export default InterstitialAd
