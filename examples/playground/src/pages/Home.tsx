import {Button, Checkbox, Group} from '@mantine/core';
import {useForm} from '@mantine/form';

const initialHref = window.location.href;

const reload = () => {
  window.location.href = initialHref;
};

function ConfigForm() {
  const form = useForm<
    Parameters<typeof admob.configure>[0] & {appMutedEnabled: boolean}
  >({
    initialValues: {
      appMutedEnabled: false,
    },
    transformValues(values) {
      if (values.appMutedEnabled) values.appMuted = undefined;

      return values;
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(async values => {
        await admob.configure(values);
      })}
    >
      <Group mt="md">
        <Checkbox
          label="Volume Mute: "
          {...form.getInputProps('appMutedEnabled', {type: 'checkbox'})}
        />
        <Checkbox
          label={`${form.values.appMuted}`}
          disabled={!form.values.appMutedEnabled}
          {...form.getInputProps('appMuted', {type: 'checkbox'})}
        />
      </Group>

      <Group justify="right" mt="md">
        <Button type="submit">admob.configure()</Button>
      </Group>
    </form>
  );
}

function Home() {
  return (
    <>
      <ConfigForm />
      <Button onClick={reload}>Reload</Button>
    </>
  );
}

export default Home;
