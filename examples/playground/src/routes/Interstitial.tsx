import * as React from 'react'

export interface InterstitialProps {}

const Interstitial: React.FC<InterstitialProps> = () => {
  return (
    <div>
      <button
        onClick={() => {
          admob.interstitial.load({ id: 'test' })
        }}
      >
        load
      </button>
      <button
        onClick={() => {
          admob.interstitial.show()
        }}
      >
        show
      </button>
    </div>
  )
}

export default Interstitial
