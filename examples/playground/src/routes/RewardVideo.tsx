import * as React from 'react'

export interface RewardVideoProps {}

const RewardVideo: React.FC<RewardVideoProps> = () => {
  return (
    <div>
      <button
        onClick={() => {
          admob.rewardVideo.load({ id: 'test' })
        }}
      >
        load
      </button>
      <button
        onClick={() => {
          admob.rewardVideo.show()
        }}
      >
        show
      </button>
    </div>
  )
}

export default RewardVideo
