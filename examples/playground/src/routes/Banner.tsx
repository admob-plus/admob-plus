import { Button, ButtonGroup, Box } from '@chakra-ui/react'
import * as React from 'react'

export interface BannerProps {}

let bannerTop: any
let banner: any

const Banner: React.FC<BannerProps> = () => {
  React.useEffect(() => {
    bannerTop = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    })
    banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/2934735716',
    })
  }, [])

  return (
    <div>
      <Box>
        <ButtonGroup>
          <Button
            onClick={() => {
              bannerTop.show({ position: 'top' })
            }}
          >
            show top
          </Button>
          <Button
            onClick={() => {
              bannerTop.hide()
            }}
          >
            hide top
          </Button>
        </ButtonGroup>
      </Box>
      <ButtonGroup>
        <Button
          onClick={() => {
            banner.show({ position: 'bottom' })
          }}
        >
          show bottom
        </Button>
        <Button
          onClick={() => {
            banner.hide()
          }}
        >
          hide bottom
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Banner
