import {
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import { MaxAdContentRating, RequestConfig } from 'admob-plus-cordova'
import React from 'react'

const initialHref = window.location.href

const reload = () => {
  window.location.href = initialHref
}

const toBool = (s: FormDataEntryValue | null) => {
  switch (s) {
    case 'true':
      return true
    case 'false':
      return false
    case 'null':
      return null
    default:
      return undefined
  }
}

const Home: React.FC = () => {
  return (
    <div>
      <Button onClick={reload}>reload</Button>
      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const formData = new FormData(event.target as HTMLFormElement)
          const config: RequestConfig = {}

          let maxAdContentRating = formData.get('maxAdContentRating')
          config.maxAdContentRating =
            maxAdContentRating === null || maxAdContentRating === 'null'
              ? MaxAdContentRating.UNSPECIFIED
              : (maxAdContentRating as MaxAdContentRating)

          config.tagForChildDirectedTreatment = toBool(
            formData.get('tagForChildDirectedTreatment'),
          )

          config.tagForUnderAgeOfConsent = toBool(
            formData.get('tagForUnderAgeOfConsent'),
          )

          await admob.configRequest(config)
        }}
      >
        <FormControl as="fieldset">
          <FormLabel as="legend">MaxAdContentRating</FormLabel>
          <RadioGroup defaultValue="-" name="maxAdContentRating">
            <Stack>
              {Object.keys(MaxAdContentRating).map((k) => (
                <Radio
                  key={k}
                  value={
                    MaxAdContentRating[k as keyof typeof MaxAdContentRating] ||
                    'null'
                  }
                >
                  {k}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">ChildDirectedTreatmentTag</FormLabel>
          <RadioGroup defaultValue="-" name="tagForChildDirectedTreatment">
            <Stack>
              {['true', 'false', 'null'].map((k) => (
                <Radio key={k} value={k}>
                  {k}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">UnderAgeOfConsentTag</FormLabel>
          <RadioGroup defaultValue="-" name="tagForUnderAgeOfConsent">
            <Stack>
              {['true', 'false', 'null'].map((k) => (
                <Radio key={k} value={k}>
                  {k}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Config Ad Request
        </Button>
      </form>
    </div>
  )
}

export default Home
