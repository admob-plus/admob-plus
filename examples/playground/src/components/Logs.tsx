import { Box, useColorMode } from '@chakra-ui/react'
import { Events } from 'admob-plus-cordova'
import * as React from 'react'

const eventTypes = ['deviceready', ...Object.values(Events)]

type Log = { time: Date; event: Event }

const logLine = (log: Log) => {
  const s = JSON.stringify({
    ...log.event,
    isTrusted: undefined,
  })
  if (s === '{}') {
    return log.event.type
  }
  return `${log.event.type}: ${s}`
}

export interface LogsProps {}

const Logs: React.FC<LogsProps> = () => {
  const [logs, setLogs] = React.useState<Array<Log>>([])
  const { colorMode } = useColorMode()

  React.useEffect(() => {
    const listener = (event: Event) => {
      setLogs((prev) => [
        ...prev,
        {
          time: new Date(),
          event,
        },
      ])
    }

    for (const eventType of eventTypes) {
      document.addEventListener(eventType, listener, false)
    }

    return () => {
      for (const eventType of eventTypes) {
        document.removeEventListener(eventType, listener)
      }
    }
  }, [])

  return (
    <Box
      style={{ overflow: 'auto' }}
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      w="100%"
    >
      {logs.map((log, i) => (
        <div key={i}>{logLine(log)}</div>
      ))}
    </Box>
  )
}

export default Logs
