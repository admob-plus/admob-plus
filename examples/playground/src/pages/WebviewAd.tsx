import {Button} from '@mantine/core';

function WebviewAd() {
  return (
    <>
      <Button onClick={() => admob.WebViewAd.checkIntegration()}>Check</Button>
    </>
  );
}

export default WebviewAd;
