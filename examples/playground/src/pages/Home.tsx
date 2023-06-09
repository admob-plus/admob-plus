import { Button } from '@mantine/core';

const initialHref = window.location.href;

const reload = () => {
  window.location.href = initialHref;
};

function Home() {
  return (
    <>
      <Button onClick={reload}>Reload</Button>
    </>
  );
}

export default Home;
