import { Button } from '@chakra-ui/react'
import * as React from 'react'

export interface RewardVideoProps {}

const RewardVideo: React.FC<RewardVideoProps> = () => {
  return (
    <div>
      <Button
        onClick={() => {
          admob.rewardVideo.load({ id: 'test' })
        }}
      >
        load
      </Button>
      <Button
        onClick={() => {
          admob.rewardVideo.show()
        }}
      >
        show
      </Button>
    </div>
  )
}

export default RewardVideo
