import { Button, ButtonGroup, Box } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import * as React from 'react'

export interface BannerProps {}

const BannerAd: React.FC<BannerProps> = () => {
  const banners = React.useMemo(
    () => ({
      top: new admob.BannerAd({
        adUnitId: 'ca-app-pub-3940256099942544/6300978111',
        position: 'top',
      }),
      bottom: new admob.BannerAd({
        adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      }),
    }),
    [admob],
  )

  return (
    <div>
      <Box>
        <ButtonGroup>
          <Button
            onClick={() => {
              banners.top.show()
            }}
          >
            show top
          </Button>
          <Button
            onClick={() => {
              banners.top.hide()
            }}
          >
            hide top
          </Button>
        </ButtonGroup>
      </Box>
      <ButtonGroup>
        <Button
          onClick={() => {
            banners.bottom.show()
          }}
        >
          show bottom
        </Button>
        <Button
          onClick={() => {
            banners.bottom.hide()
          }}
        >
          hide bottom
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default BannerAd
