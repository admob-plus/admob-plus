import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Spacer,
} from '@chakra-ui/react'
import type {
  RewardedAd as Rewarded,
  RewardedAdOptions,
} from 'admob-plus-cordova'
import _ from 'lodash'
import * as React from 'react'
import { atom, useRecoilState } from 'recoil'

const rewardedsState = atom<Rewarded[]>({
  key: 'rewardeds',
  default: [],
})

export const CreateForm: React.FC<{
  onCreate: (opts: Omit<RewardedAdOptions, 'adUnitId'>) => void
}> = ({ onCreate }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const customData = (formData.get('customData') as string) || undefined
        const userId = (formData.get('userId') as string) || undefined
        onCreate({
          serverSideVerification:
            customData || userId ? { customData, userId } : undefined,
        })
      }}
    >
      <FormControl as="fieldset">
        <FormLabel as="legend">Server-side Verification</FormLabel>
        <Input name="customData" placeholder="customData" />
        <Input name="userId" placeholder="userId" />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Create
      </Button>
    </form>
  )
}

export interface RewardedAdProps {}

const RewardedAd: React.FC<RewardedAdProps> = () => {
  const [ads, setAds] = useRecoilState(rewardedsState)

  return (
    <div>
      <CreateForm
        onCreate={(opts) => {
          setAds((prevState) => [
            ...prevState,
            new admob.RewardedAd({
              adUnitId: 'ca-app-pub-3940256099942544/5224354917',
              ...opts,
            }),
          ])
        }}
      />
      <List>
        {ads.map((ad) => (
          <ListItem key={ad.id}>
            <Flex>
              <Box>
                {ad.id}:{' '}
                {JSON.stringify(_.omit(_.get(ad, 'opts'), ['adUnitId']))}
              </Box>
              <Spacer />
              <ButtonGroup>
                <Button
                  onClick={() => {
                    ad.load()
                  }}
                >
                  load
                </Button>
                <Button
                  onClick={() => {
                    ad.show()
                  }}
                >
                  show
                </Button>
              </ButtonGroup>
            </Flex>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default RewardedAd
