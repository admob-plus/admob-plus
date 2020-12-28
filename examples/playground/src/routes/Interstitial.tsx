import { Button } from '@chakra-ui/react'
import * as React from 'react'

export interface InterstitialProps {}

const Interstitial: React.FC<InterstitialProps> = () => {
  return (
    <div>
      <Button
        onClick={() => {
          admob.interstitial.load({ id: 'test' })
        }}
      >
        load
      </Button>
      <Button
        onClick={() => {
          admob.interstitial.show()
        }}
      >
        show
      </Button>
    </div>
  )
}

export default Interstitial
