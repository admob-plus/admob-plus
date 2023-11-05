import {Collapse, Group} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {CodeHighlight} from '@mantine/code-highlight';
import {signal} from '@preact/signals-react';
import {Events} from 'admob-plus-cordova';
import {type FC} from 'react';
import TimeAgo from 'react-timeago';

const eventTypes = [
  'DOMContentLoaded',
  'deviceready',
  ...Object.values(Events),
];

type Log = {time: Date; event: Event};

const logs = signal<Log[]>([]);

for (const eventType of eventTypes) {
  document.addEventListener(
    eventType,
    event => {
      logs.value = [
        {
          time: new Date(),
          event,
        },
        ...logs.value,
      ];
    },
    false
  );
}

const LogItem: FC<{log: Log}> = ({log}) => {
  const [opened, {toggle}] = useDisclosure(false);
  const s = JSON.stringify(
    {
      ...log.event,
      isTrusted: undefined,
    },
    null,
    2
  );

  return (
    <>
      <Group justify="space-between" onClick={toggle}>
        {log.event.type}
        <TimeAgo date={log.time} />
      </Group>
      {s !== '{}' && (
        <Collapse in={opened}>
          <CodeHighlight language="json" code={s} />
        </Collapse>
      )}
    </>
  );
};

const Logs: FC = () => {
  return (
    <>
      {logs.value.map((log, i) => (
        <LogItem key={i} log={log} />
      ))}
    </>
  );
};

export default Logs;
