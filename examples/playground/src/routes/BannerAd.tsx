import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Spacer,
} from '@chakra-ui/react'
import type { BannerAd as Banner } from 'admob-plus-cordova'
import _ from 'lodash'
import * as React from 'react'
import { atom, useRecoilState } from 'recoil'

const bannersState = atom<Banner[]>({
  key: 'banners',
  default: [],
})

export interface BannerProps {}

const BannerAd: React.FC<BannerProps> = () => {
  const [banners, setBanners] = useRecoilState(bannersState)

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          const formData = new FormData(event.target as HTMLFormElement)
          setBanners((prevState) => [
            ...prevState,
            new admob.BannerAd({
              adUnitId: 'ca-app-pub-3940256099942544/6300978111',
              // @ts-ignore
              position: formData.get('position') ?? undefined,
            }),
          ])
        }}
      >
        <FormControl as="fieldset">
          <FormLabel as="legend">Position</FormLabel>
          <RadioGroup defaultValue="bottom" name="position">
            <HStack spacing="24px">
              <Radio value="top">Top</Radio>
              <Radio value="bottom">Bottom</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Create
        </Button>
      </form>
      <List>
        {banners.map((ad) => (
          <ListItem key={ad.id}>
            <Flex>
              <Box>
                {ad.id}: {_.get(ad, 'opts.position')}
              </Box>
              <Spacer />
              <ButtonGroup>
                <Button
                  onClick={() => {
                    ad.show()
                  }}
                >
                  show
                </Button>
                <Button
                  onClick={() => {
                    ad.hide()
                  }}
                >
                  hide
                </Button>
              </ButtonGroup>
            </Flex>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BannerAd
