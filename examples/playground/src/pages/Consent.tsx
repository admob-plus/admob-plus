import {Button} from '@mantine/core';
import {Consent, ConsentForm} from 'cordova-plugin-consent';
import {useState} from 'react';

function ActionButton({
  method,
  args = [],
}: {
  method: keyof Consent;
  args?: any[];
}) {
  const fn = consent[method];
  if (!(fn instanceof Function)) return null;

  const [result, setResult] = useState<Awaited<ReturnType<typeof fn>>>();

  return (
    <Button
      onClick={async () => {
        setResult(await fn.apply(consent, args as never));
      }}
    >
      {method}() = {result as never}
    </Button>
  );
}

function RequestButton() {
  if (cordova.platformId !== 'ios') return null;

  return <ActionButton method="requestTrackingAuthorization" />;
}

function ConsentFormActions() {
  const [form, setForm] = useState<ConsentForm>();

  return (
    <>
      <Button
        onClick={async () => {
          setForm(await consent.loadForm());
        }}
      >
        loadForm()
      </Button>
      {form && (
        <Button
          onClick={async () => {
            await form.show();
          }}
        >
          show
        </Button>
      )}
    </>
  );
}

function ConsentPage() {
  return (
    <div>
      <ActionButton method="canRequestAds" />
      <ActionButton method="privacyOptionsRequirementStatus" />
      <ActionButton method="loadAndShowIfRequired" />
      <ActionButton method="showPrivacyOptionsForm" />
      <ActionButton method="getConsentStatus" />
      <RequestButton />
      <ActionButton
        method="requestInfoUpdate"
        args={[
          {
            debugGeography: consent.DebugGeography.EEA,
            testDeviceIds: ['TEST-DEVICE-HASHED-ID'],
          },
        ]}
      />
      <ActionButton method="getFormStatus" />
      <ConsentFormActions />
      <ActionButton method="reset" />
    </div>
  );
}

export default ConsentPage;
