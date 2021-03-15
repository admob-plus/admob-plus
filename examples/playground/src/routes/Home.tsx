import {
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import {
  ChildDirectedTreatmentTag,
  MaxAdContentRating,
  RequestConfig,
  UnderAgeOfConsentTag,
} from 'admob-plus-cordova'
import React from 'react'

const initialHref = window.location.href

const reload = () => {
  window.location.href = initialHref
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
            maxAdContentRating === null || maxAdContentRating === '-'
              ? MaxAdContentRating.UNSPECIFIED
              : (maxAdContentRating as MaxAdContentRating)

          let tagForChildDirectedTreatment = formData.get(
            'tagForChildDirectedTreatment',
          )
          config.tagForChildDirectedTreatment =
            tagForChildDirectedTreatment === null
              ? ChildDirectedTreatmentTag.UNSPECIFIED
              : (Number(
                  tagForChildDirectedTreatment,
                ) as ChildDirectedTreatmentTag)

          let tagForUnderAgeOfConsent = formData.get('tagForUnderAgeOfConsent')
          config.tagForUnderAgeOfConsent =
            tagForUnderAgeOfConsent === null
              ? UnderAgeOfConsentTag.UNSPECIFIED
              : (Number(tagForUnderAgeOfConsent) as UnderAgeOfConsentTag)

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
                    '-'
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
          <RadioGroup
            defaultValue={ChildDirectedTreatmentTag.UNSPECIFIED.toString()}
            name="tagForChildDirectedTreatment"
          >
            <Stack>
              {Object.keys(ChildDirectedTreatmentTag)
                .filter((x) => Number.isNaN(+x))
                .map((k) => (
                  <Radio
                    key={k}
                    value={ChildDirectedTreatmentTag[
                      k as keyof typeof ChildDirectedTreatmentTag
                    ].toString()}
                  >
                    {k}
                  </Radio>
                ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">UnderAgeOfConsentTag</FormLabel>
          <RadioGroup
            defaultValue={UnderAgeOfConsentTag.UNSPECIFIED.toString()}
            name="tagForUnderAgeOfConsent"
          >
            <Stack>
              {Object.keys(UnderAgeOfConsentTag)
                .filter((x) => Number.isNaN(+x))
                .map((k) => (
                  <Radio
                    key={k}
                    value={UnderAgeOfConsentTag[
                      k as keyof typeof UnderAgeOfConsentTag
                    ].toString()}
                  >
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
