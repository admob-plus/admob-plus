import { Button } from "@mantine/core";
import { useMemo } from 'react';

function InterstitialAd() {
  const interstitial = useMemo(
    () =>
      new admob.InterstitialAd({
        adUnitId: "ca-app-pub-3940256099942544/1033173712",
      }),
    [],
  );

  return (
    <>
      <Button
        onClick={() => {
          interstitial.load();
        }}
      >
        Load
      </Button>
      <Button
        onClick={() => {
          interstitial.show();
        }}
      >
        Show
      </Button>
    </>
  );
}

export default InterstitialAd;
